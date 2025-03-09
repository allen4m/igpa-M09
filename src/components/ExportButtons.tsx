import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toast } from 'react-hot-toast';
import { CourseEntry, CourseWeight, StudentDetails, TranscriptStatus } from '../types';
import { GradeSystem } from '../lib/airtable';
import { calculateGPA } from '../lib/gpa';

type ExportButtonsProps = {
  studentName: string;
  schoolName: string;
  courses: CourseEntry[];
  gpa: number | null;
  country: string;
  gradingSystem?: GradeSystem[];
  studentDetails: StudentDetails;
  transcriptStatus: TranscriptStatus;
  selectedGradingMode?: string;
};

export default function ExportButtons({
  studentName,
  schoolName,
  courses,
  gpa,
  country,
  gradingSystem,
  studentDetails,
  transcriptStatus,
  selectedGradingMode
}: ExportButtonsProps) {
  const generatePDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });

      doc.setFont('helvetica');
      const margin = 1;
      const pageWidth = 8.5;
      const pageHeight = 11;
      const contentWidth = pageWidth - (2 * margin);
      let yPos = margin;
      let currentPage = 1;

      const addNewPage = () => {
        doc.addPage();
        currentPage++;
        yPos = margin;
        addPageNumber();
      };

      const addPageNumber = () => {
        doc.setFontSize(8);
        doc.text(`Page ${currentPage}`, pageWidth / 2, pageHeight - 0.3, { align: 'center' });
      };

      const checkPageBreak = (height: number) => {
        if (yPos + height > pageHeight - margin) {
          addNewPage();
          return true;
        }
        return false;
      };

      const addText = (text: string, options: {
        fontSize?: number;
        isBold?: boolean;
        isCenter?: boolean;
        indent?: number;
        lineHeight?: number;
      } = {}) => {
        const {
          fontSize = 10,
          isBold = false,
          isCenter = false,
          indent = 0,
          lineHeight = 0.2
        } = options;

        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');

        const x = isCenter ? pageWidth / 2 : margin + indent;
        const textOptions = isCenter ? { align: 'center' } : undefined;

        checkPageBreak(lineHeight);
        doc.text(text, x, yPos, textOptions);
        yPos += lineHeight;
      };

      const addSection = (title: string) => {
        checkPageBreak(0.5);
        doc.setFillColor(245, 247, 250);
        doc.rect(margin, yPos - 0.15, contentWidth, 0.3, 'F');
        addText(title, { fontSize: 12, isBold: true, lineHeight: 0.3 });
        yPos += 0.1;
      };

      // Title and Summary
      addText('Academic Report', { fontSize: 24, isBold: true, isCenter: true, lineHeight: 0.5 });
      addText(`Generated on ${new Date().toLocaleString()}`, { fontSize: 9, isCenter: true, lineHeight: 0.3 });
      yPos += 0.2;

      // Course Summary
      addText(`Total Courses: ${courses.length}`, { fontSize: 10, lineHeight: 0.2 });
      const { totalCredits } = calculateGPA(courses, gradingSystem || [], false);
      addText(`Total Credit Hours: ${totalCredits.toFixed(2)}`, { fontSize: 10, lineHeight: 0.3 });
      yPos += 0.2;

      // Student Information Section
      addSection('Student Information');

      const studentInfo = [
        ['Full Name:', studentDetails.fullName, 'School:', schoolName],
        ['Date of Birth:', studentDetails.dateOfBirth, 'Graduation Date:', studentDetails.graduationDate],
        ['Nationality:', studentDetails.nationality, 'Transcript Status:', 
         `${transcriptStatus.isOfficial ? 'Official' : 'Unofficial'}, ${transcriptStatus.isFinal ? 'Final' : 'In Progress'}`]
      ];

      studentInfo.forEach(row => {
        const [label1, value1, label2, value2] = row;
        checkPageBreak(0.25);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(label1, margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(value1, margin + 1.2, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(label2, margin + 3.5, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(value2, margin + 4.7, yPos);
        yPos += 0.25;
      });
      yPos += 0.2;

      // Grading System Section
      addSection('Grading System Information');
      addText(`Country: ${country}`, { lineHeight: 0.2 });
      if (selectedGradingMode) {
        addText(`Scale: ${selectedGradingMode}`, { lineHeight: 0.2 });
      }
      yPos += 0.2;

      if (gradingSystem && gradingSystem.length > 0) {
        // Sort grades by numeric range (descending)
        const sortedGrades = [...gradingSystem].sort((a, b) => b.grade_range_max - a.grade_range_max);
        
        // Determine if we need the description column
        const hasUniqueDescriptions = sortedGrades.some(grade => 
          grade.grade_description && 
          grade.grade_description !== grade.local_grade &&
          grade.grade_description !== grade.us_grade_letter
        );

        // Define columns
        const headers = ['Scale', 'Local Grade', 'U.S. Grade', 'Points'];
        if (hasUniqueDescriptions) headers.push('Description');
        
        const colWidths = hasUniqueDescriptions 
          ? [1.2, 1, 1, 0.8, 2] 
          : [1.5, 1.2, 1, 0.8];
        
        checkPageBreak(0.3);
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 0.15, contentWidth, 0.3, 'F');
        
        let xPos = margin;
        headers.forEach((header, i) => {
          doc.setFont('helvetica', 'bold');
          doc.text(header, xPos + 0.1, yPos);
          xPos += colWidths[i];
        });
        yPos += 0.2;

        sortedGrades.forEach((grade, i) => {
          if (checkPageBreak(0.25)) {
            xPos = margin;
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, yPos - 0.15, contentWidth, 0.3, 'F');
            headers.forEach((header, i) => {
              doc.setFont('helvetica', 'bold');
              doc.text(header, xPos + 0.1, yPos);
              xPos += colWidths[i];
            });
            yPos += 0.2;
          }

          if (i % 2 === 0) {
            doc.setFillColor(248, 248, 248);
            doc.rect(margin, yPos - 0.15, contentWidth, 0.25, 'F');
          }

          xPos = margin;
          doc.setFont('helvetica', 'normal');
          
          // Scale column
          const scaleText = grade.grade_range_min === grade.grade_range_max
            ? grade.grade_range_min.toString()
            : `${grade.grade_range_min}-${grade.grade_range_max}`;
          doc.text(scaleText, xPos + 0.1, yPos);
          xPos += colWidths[0];

          // Local Grade column
          doc.text(grade.local_grade || '-', xPos + 0.1, yPos);
          xPos += colWidths[1];

          // U.S. Grade column
          doc.text(grade.us_grade_letter || '-', xPos + 0.1, yPos);
          xPos += colWidths[2];

          // Points column
          doc.text(grade.grade_points.toFixed(2), xPos + 0.1, yPos);
          xPos += colWidths[3];

          // Description column (if needed)
          if (hasUniqueDescriptions && grade.grade_description) {
            doc.text(grade.grade_description, xPos + 0.1, yPos);
          }
          
          yPos += 0.25;
        });
      }
      yPos += 0.2;

      // Courses Section
      addSection('Course Information');
      
      const courseHeaders = ['Course', 'Credits', 'Grade', 'Weight', 'Points'];
      const courseColWidths = [2.5, 0.8, 0.8, 1.2, 0.8];
      
      const addCourseTableHeader = () => {
        let xPos = margin;
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 0.15, contentWidth, 0.3, 'F');
        
        courseHeaders.forEach((header, i) => {
          doc.setFont('helvetica', 'bold');
          doc.text(header, xPos + 0.1, yPos);
          xPos += courseColWidths[i];
        });
        yPos += 0.2;
      };

      addCourseTableHeader();

      courses.forEach((course, i) => {
        if (checkPageBreak(0.25)) {
          addCourseTableHeader();
        }

        if (i % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(margin, yPos - 0.15, contentWidth, 0.25, 'F');
        }

        let xPos = margin;
        doc.setFont('helvetica', 'normal');
        doc.text(course.course, xPos + 0.1, yPos);
        xPos += courseColWidths[0];
        doc.text(course.credits, xPos + 0.1, yPos);
        xPos += courseColWidths[1];
        doc.text(course.grade, xPos + 0.1, yPos);
        xPos += courseColWidths[2];
        doc.text(getWeightLabel(course.weight), xPos + 0.1, yPos);
        xPos += courseColWidths[3];

        // Calculate grade points based on the grade
        let gradePoints = 0;
        if (gradingSystem) {
          const numericGrade = parseFloat(course.grade);
          const matchingGrade = gradingSystem.find(g => 
            !isNaN(numericGrade) 
              ? (numericGrade >= g.grade_range_min && numericGrade <= g.grade_range_max)
              : (g.local_grade === course.grade || g.us_grade_letter === course.grade)
          );
          if (matchingGrade) {
            gradePoints = matchingGrade.grade_points;
          }
        }
        
        doc.text(gradePoints.toFixed(2), xPos + 0.1, yPos);
        yPos += 0.25;
      });
      yPos += 0.2;

      // GPA Summary Section
      addSection('GPA Summary');
      
      const { gpa: unweightedGPA } = calculateGPA(courses, gradingSystem || [], false);
      const { gpa: weightedGPA } = calculateGPA(courses, gradingSystem || [], true);

      addText(`Unweighted GPA: ${unweightedGPA?.toFixed(2) || '0.00'}`, { lineHeight: 0.25 });
      addText(`Weighted GPA: ${weightedGPA?.toFixed(2) || '0.00'}`, { lineHeight: 0.25 });

      // Add page number to first page
      addPageNumber();

      // Save PDF
      const filename = `Academic_Report_${studentName.replace(/\s+/g, '_')}.pdf`;
      doc.save(filename);
      toast.success('Academic report generated successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate academic report');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    >
      <Download className="w-4 h-4" />
      Download Academic Report
    </button>
  );
}

function getWeightLabel(weight: CourseWeight): string {
  switch (weight) {
    case 'honors': return 'Honors (+0.5)';
    case 'ap': return 'AP/IB (+1.0)';
    default: return 'Regular';
  }
}