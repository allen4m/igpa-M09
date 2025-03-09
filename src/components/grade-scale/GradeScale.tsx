import React from 'react';
import { type GradeSystem } from '../../lib/types';
import GradeTable from './GradeTable';
import AdditionalInfo from './AdditionalInfo';

type GradeScaleProps = {
  gradingSystem: GradeSystem[];
  selectedMode: string;
};

export default function GradeScale({ 
  gradingSystem, 
  selectedMode 
}: GradeScaleProps) {
  const filteredSystem = selectedMode
    ? gradingSystem.filter(gs => gs.grading_mode === selectedMode)
    : gradingSystem;

  // Custom sorting function for UK GCSE grades
  const sortGrades = (grades: GradeSystem[]) => {
    const isUKGCSE = grades.some(g => 
      g.country_name === 'United Kingdom' && 
      g.grading_mode?.includes('GCSE')
    );

    if (isUKGCSE) {
      // Sort UK GCSE grades in specific order: A*, A, B, C, D, E, F, G, U
      const gradeOrder = ['A*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'U'];
      return [...grades].sort((a, b) => {
        const aIndex = gradeOrder.indexOf(a.local_grade || '');
        const bIndex = gradeOrder.indexOf(b.local_grade || '');
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        // Fallback to default sorting if grades not found in order
        return (b.grade_points - a.grade_points) || 
               (b.grade_range_max - a.grade_range_max) ||
               (b.grade_range_min - a.grade_range_min);
      });
    }

    // Default sorting for other grading systems
    return [...grades].sort((a, b) => {
      if (a.grade_range_max !== b.grade_range_max) {
        return b.grade_range_max - a.grade_range_max;
      }
      if (a.grade_range_min !== b.grade_range_min) {
        return b.grade_range_min - a.grade_range_min;
      }
      if (a.grade_points !== b.grade_points) {
        return b.grade_points - a.grade_points;
      }
      if (a.local_grade && b.local_grade) {
        return b.local_grade.localeCompare(a.local_grade);
      }
      return 0;
    });
  };

  const sortedGrades = sortGrades(filteredSystem);
  const hasLocalGrades = sortedGrades.some(grade => grade.local_grade);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        {selectedMode && filteredSystem[0]?.attention && (
          <div className="mb-4 space-y-2 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
            <p className="font-medium text-amber-800">Important Note:</p>
            <p className="text-amber-700">{filteredSystem[0].attention}</p>
          </div>
        )}

        <GradeTable 
          grades={sortedGrades} 
          showLocalGrades={hasLocalGrades}
        />
        
        {selectedMode && filteredSystem[0]?.additional_scale_info && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {filteredSystem[0].additional_scale_info}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}