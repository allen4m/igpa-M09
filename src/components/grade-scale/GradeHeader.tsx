import React from 'react';

type GradeHeaderProps = {
  showLocalGrades: boolean;
  showDescription: boolean;
};

export default function GradeHeader({ showLocalGrades, showDescription }: GradeHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
          Scale
        </th>
        {showLocalGrades && (
          <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
            Local Grade
          </th>
        )}
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
          U.S. Grade
        </th>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
          Points
        </th>
        {showDescription && (
          <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
            Description
          </th>
        )}
      </tr>
    </thead>
  );
}