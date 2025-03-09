import React from 'react';
import { type GradeSystem } from '../../lib/types';
import GradeHeader from './GradeHeader';
import GradeRow from './GradeRow';

type GradeTableProps = {
  grades: GradeSystem[];
  showLocalGrades: boolean;
};

export default function GradeTable({ grades, showLocalGrades }: GradeTableProps) {
  // Only show description column if at least one grade has a unique description
  const showDescription = grades.some(grade => 
    grade.grade_description && 
    grade.grade_description !== grade.local_grade &&
    grade.grade_description !== grade.us_grade_letter
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <GradeHeader 
            showLocalGrades={showLocalGrades} 
            showDescription={showDescription}
          />
          <tbody className="divide-y divide-gray-200">
            {grades.map((grade, index) => (
              <GradeRow 
                key={index} 
                grade={grade} 
                index={index}
                showLocalGrades={showLocalGrades}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}