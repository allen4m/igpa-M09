import { CourseEntry, CourseWeight } from '../types';
import { GradeSystem } from './airtable';

const weightBonuses: Record<CourseWeight, number> = {
  regular: 0.0,
  honors: 0.5,
  ap: 1.0
};

export function validateGradeValue(grade: number): boolean {
  return grade >= 0 && grade <= 4.0;
}

export function validateCreditHours(credits: number): boolean {
  return credits > 0 && credits <= 12 && Number.isInteger(credits * 2);
}

export function calculateGPA(
  courses: CourseEntry[],
  gradingSystem: GradeSystem[],
  includeWeights: boolean = false
): { gpa: number | null; totalCredits: number; error?: string } {
  try {
    // Filter out courses with missing data
    const validCourses = courses.filter(course => 
      course.grade && course.credits && parseFloat(course.credits) > 0
    );

    if (validCourses.length === 0) {
      return { gpa: null, totalCredits: 0, error: 'No valid courses found' };
    }

    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of validCourses) {
      const credits = parseFloat(course.credits);
      
      // Find matching grade in grading system
      let gradePoints: number | null = null;
      const numericGrade = parseFloat(course.grade);
      
      if (!isNaN(numericGrade)) {
        // Handle numeric grades
        const matchingGrade = gradingSystem.find(g => 
          numericGrade >= g.grade_range_min && 
          numericGrade <= g.grade_range_max
        );
        if (matchingGrade) {
          gradePoints = matchingGrade.grade_points;
        }
      } else {
        // Handle letter grades
        const matchingGrade = gradingSystem.find(g => 
          g.local_grade === course.grade || 
          g.us_grade_letter === course.grade
        );
        if (matchingGrade) {
          gradePoints = matchingGrade.grade_points;
        }
      }

      if (gradePoints === null) {
        return { 
          gpa: null, 
          totalCredits: 0, 
          error: `Invalid grade for course: ${course.course}` 
        };
      }

      // Apply course weight if needed
      const weightBonus = includeWeights ? weightBonuses[course.weight] : 0;
      const points = gradePoints + weightBonus;

      totalPoints += credits * points;
      totalCredits += credits;
    }

    if (totalCredits === 0) {
      return { gpa: null, totalCredits: 0, error: 'Total credits cannot be zero' };
    }

    return { 
      gpa: totalPoints / totalCredits, 
      totalCredits 
    };
  } catch (error) {
    return { 
      gpa: null, 
      totalCredits: 0, 
      error: error instanceof Error ? error.message : 'GPA calculation error' 
    };
  }
}