import React from 'react';
import { type GradeSystem } from '../../lib/types';

type GradeRowProps = {
  grade: GradeSystem;
  index: number;
  showLocalGrades: boolean;
};

export default function GradeRow({ grade, index, showLocalGrades }: GradeRowProps) {
  const getScaleDisplay = () => {
    if (grade.grade_range_min === grade.grade_range_max) {
      return grade.grade_range_min.toString();
    }
    return `${grade.grade_range_min}-${grade.grade_range_max}`;
  };

  // Only show description if it differs from local grade and US grade
  const showDescription = grade.grade_description && 
    grade.grade_description !== grade.local_grade &&
    grade.grade_description !== grade.us_grade_letter;

  return (
    <tr className={`${
      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
    } hover:bg-gray-100 transition-colors`}>
      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap font-medium">
        {getScaleDisplay()}
      </td>
      {showLocalGrades && (
        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
          {grade.local_grade || '-'}
        </td>
      )}
      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
        {grade.us_grade_letter || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
        {grade.grade_points.toFixed(2)}
      </td>
      {showDescription && (
        <td className="px-4 py-3 text-sm text-gray-600">
          {grade.grade_description}
        </td>
      )}
    </tr>
  );
}