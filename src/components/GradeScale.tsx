import React from 'react';
import { AlertCircle } from 'lucide-react';
import { type GradeSystem } from '../lib/airtable';

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

  const sortedGrades = [...filteredSystem].sort((a, b) => b.grade_points - a.grade_points);

  return (
    <div className="space-y-5">
      {/* Special Attention Notes */}
      {selectedMode && filteredSystem[0]?.attention && (
        <div className="flex items-start gap-3 p-4 bg-[#FFF9E6] border border-[#E6D9B8] rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Important Note</h4>
            <p className="text-sm text-amber-700">{filteredSystem[0].attention}</p>
          </div>
        </div>
      )}

      {/* Grade Scale Table */}
      <div className="rounded-xl border border-[#DEE2E6] bg-white">
        <table className="w-full">
          <thead className="bg-[#F8F9FA]">
            <tr>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-gray-700 text-center border-b border-[#DEE2E6]">
                Local Grade
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-gray-700 text-center border-b border-[#DEE2E6]">
                US Grade
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-gray-700 text-center border-b border-[#DEE2E6]">
                Quality Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DEE2E6]">
            {sortedGrades.map((grade, index) => (
              <tr 
                key={index} 
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="px-5 py-4 text-sm text-gray-900 text-center">
                  {grade.local_grade || (
                    grade.grade_range_min === grade.grade_range_max
                      ? grade.grade_range_min
                      : `${grade.grade_range_min}-${grade.grade_range_max}`
                  )}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-gray-900 text-center">
                  {grade.us_grade_letter || '-'}
                </td>
                <td className="px-5 py-4 text-sm text-gray-900 text-center">
                  {grade.grade_points.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Information */}
      {selectedMode && (
        <div className="text-sm text-gray-500 pt-2">
          <p>
            This grading scale is used for {selectedMode.toLowerCase()} programs.
            Please ensure your grades match the format shown above.
          </p>
        </div>
      )}
    </div>
  );
}