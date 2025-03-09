import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, RefreshCcw, Info, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CountrySelector from './CountrySelector';
import StudentInfo from './StudentInfo';
import CourseTable from './CourseTable';
import GradeScale from './grade-scale/GradeScale';
import ExportButtons from './ExportButtons';
import { fetchGradingSystems } from '../lib/database';
import type { GradeSystem } from '../lib/types';
import { validateCredits, validateGrade } from '../lib/validation';
import { CourseEntry, CourseWeight, StudentDetails, TranscriptStatus } from '../types';

const weightBonuses: Record<CourseWeight, number> = {
  regular: 0,
  honors: 0.5,
  ap: 1.0
};

export default function GPACalculator() {
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    graduationDate: ''
  });

  const [transcriptStatus, setTranscriptStatus] = useState<TranscriptStatus>({
    isOfficial: true,
    isFinal: true
  });

  const [schoolName, setSchoolName] = useState('');
  const [country, setCountry] = useState('');
  const [gradingMode, setGradingMode] = useState('');
  const [showGradeScale, setShowGradeScale] = useState(false);
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', course: '', grade: '', credits: '', weight: 'regular' }
  ]);
  const [gradingSystems, setGradingSystems] = useState<Record<string, GradeSystem[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGradingSystems = async () => {
      try {
        const systems = await fetchGradingSystems();
        setGradingSystems(systems);
      } catch (error) {
        toast.error('Failed to load grading systems');
      } finally {
        setIsLoading(false);
      }
    };
    loadGradingSystems();
  }, []);

  useEffect(() => {
    setGradingMode('');
  }, [country]);

  const currentGradingSystem = country ? gradingSystems[country] : undefined;
  const gradingModes = currentGradingSystem 
    ? [...new Set(currentGradingSystem.map(gs => gs.grading_mode))]
    : [];

  const filteredGradingSystem = useMemo(() => {
    if (!currentGradingSystem) return undefined;
    return gradingMode
      ? currentGradingSystem.filter(gs => gs.grading_mode === gradingMode)
      : currentGradingSystem;
  }, [currentGradingSystem, gradingMode]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), course: '', grade: '', credits: '', weight: 'regular' }
    ]);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, field: keyof CourseEntry, value: string | CourseWeight) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const resetCalculator = () => {
    setStudentDetails({
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      graduationDate: ''
    });
    setTranscriptStatus({
      isOfficial: false,
      isFinal: false
    });
    setSchoolName('');
    setCountry('');
    setGradingMode('');
    setCourses([{ id: Date.now().toString(), course: '', grade: '', credits: '', weight: 'regular' }]);
    setShowGradeScale(false);
    toast.success('Calculator has been reset');
  };

  const handleStudentDetailsChange = (details: Partial<StudentDetails>) => {
    setStudentDetails(prev => ({ ...prev, ...details }));
  };

  const handleTranscriptStatusChange = (status: Partial<TranscriptStatus>) => {
    setTranscriptStatus(prev => ({ ...prev, ...status }));
  };

  const hasValidationErrors = useMemo(() => {
    return courses.some(course => {
      const creditError = validateCredits(course.credits);
      const gradeError = validateGrade(course.grade, filteredGradingSystem || []);
      return creditError || gradeError;
    });
  }, [courses, filteredGradingSystem]);

  const { unweightedGPA, weightedGPA } = useMemo(() => {
    if (!filteredGradingSystem || hasValidationErrors) {
      return { unweightedGPA: null, weightedGPA: null };
    }

    const validCourses = courses.filter(course => 
      course.grade && course.credits && parseFloat(course.credits) > 0
    );
    
    if (validCourses.length === 0) {
      return { unweightedGPA: null, weightedGPA: null };
    }

    let totalPoints = 0;
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let hasError = false;

    for (const course of validCourses) {
      const credits = parseFloat(course.credits);
      const numericGrade = parseFloat(course.grade);
      let gradePoints: number | null = null;

      // Find matching grade in grading system
      if (!isNaN(numericGrade)) {
        // Handle numeric grades
        const matchingGrade = filteredGradingSystem.find(g => 
          numericGrade >= g.grade_range_min && 
          numericGrade <= g.grade_range_max
        );
        if (matchingGrade) {
          gradePoints = matchingGrade.grade_points;
        }
      } else {
        // Handle letter grades
        const matchingGrade = filteredGradingSystem.find(g => 
          g.local_grade === course.grade || 
          g.us_grade_letter === course.grade
        );
        if (matchingGrade) {
          gradePoints = matchingGrade.grade_points;
        }
      }

      if (gradePoints === null) {
        hasError = true;
        break;
      }

      const weightBonus = weightBonuses[course.weight];
      totalPoints += credits * gradePoints;
      totalWeightedPoints += credits * (gradePoints + weightBonus);
      totalCredits += credits;
    }

    if (hasError || totalCredits === 0) {
      return { unweightedGPA: null, weightedGPA: null };
    }

    return {
      unweightedGPA: totalPoints / totalCredits,
      weightedGPA: totalWeightedPoints / totalCredits
    };
  }, [courses, filteredGradingSystem, hasValidationErrors]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-indigo-600 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">International GPA Calculator</h2>
          </div>
          <button
            onClick={resetCalculator}
            className="flex items-center justify-center gap-2 px-3 py-1.5 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
            title="Reset calculator"
          >
            <RefreshCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        <StudentInfo
          studentDetails={studentDetails}
          transcriptStatus={transcriptStatus}
          schoolName={schoolName}
          onStudentDetailsChange={handleStudentDetailsChange}
          onTranscriptStatusChange={handleTranscriptStatusChange}
          onSchoolNameChange={setSchoolName}
        />

        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/Region
              </label>
              <CountrySelector selected={country} onChange={setCountry} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Grading Scale
                </label>
                {currentGradingSystem && (
                  <button
                    onClick={() => setShowGradeScale(!showGradeScale)}
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    <Info className="w-4 h-4" />
                    <span>{showGradeScale ? 'Hide' : 'Show'} Scale</span>
                  </button>
                )}
              </div>
              <select
                value={gradingMode}
                onChange={(e) => setGradingMode(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] transition-colors ${
                  !country ? 'bg-gray-50' : 'bg-white'
                }`}
                disabled={!country || gradingModes.length === 0}
              >
                <option value="">
                  {!country 
                    ? 'Select a country first'
                    : gradingModes.length === 0
                    ? 'No grading scales available'
                    : 'Select grading scale'}
                </option>
                {gradingModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          {currentGradingSystem && showGradeScale && (
            <div className="bg-gray-50 rounded-lg p-4">
              <GradeScale
                gradingSystem={currentGradingSystem}
                selectedMode={gradingMode}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <CourseTable
            courses={courses}
            gradingSystem={filteredGradingSystem}
            selectedMode={gradingMode}
            onUpdateCourse={updateCourse}
            onRemoveCourse={removeCourse}
          />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <button
              onClick={addCourse}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="text-center sm:text-right space-y-1 w-full sm:w-auto">
                <div className="text-sm text-gray-600">Unweighted GPA</div>
                <div className="text-lg font-bold">
                  {unweightedGPA !== null ? unweightedGPA.toFixed(2) : '0.00'}
                </div>
              </div>
              <div className="text-center sm:text-right space-y-1 w-full sm:w-auto">
                <div className="text-sm text-gray-600">Weighted GPA</div>
                <div className="text-lg font-bold text-indigo-600">
                  {weightedGPA !== null ? weightedGPA.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 w-full">
            <div className="w-full sm:flex sm:justify-end">
              <ExportButtons
                studentName={studentDetails.fullName}
                schoolName={schoolName}
                courses={courses}
                gpa={weightedGPA}
                country={country}
                gradingSystem={filteredGradingSystem}
                studentDetails={studentDetails}
                transcriptStatus={transcriptStatus}
                selectedGradingMode={gradingMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}