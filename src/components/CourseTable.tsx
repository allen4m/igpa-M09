import React from 'react';
import { X } from 'lucide-react';
import { CourseEntry, CourseWeight } from '../types';
import { GradeSystem } from '../lib/airtable';
import { validateCredits, validateGrade } from '../lib/validation';

type CourseTableProps = {
  courses: CourseEntry[];
  gradingSystem?: GradeSystem[];
  selectedMode?: string;
  onUpdateCourse: (index: number, field: keyof CourseEntry, value: string | CourseWeight) => void;
  onRemoveCourse: (index: number) => void;
};

const weightOptions: { value: CourseWeight; label: string; bonus: number }[] = [
  { value: 'regular', label: 'Regular', bonus: 0 },
  { value: 'honors', label: 'Honors (+0.5)', bonus: 0.5 },
  { value: 'ap', label: 'AP/IB (+1.0)', bonus: 1.0 }
];

export default function CourseTable({
  courses,
  gradingSystem,
  selectedMode,
  onUpdateCourse,
  onRemoveCourse
}: CourseTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[40%]">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[15%]">Credits</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[15%]">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[25%]">Weight</th>
                <th className="px-4 py-3 w-[5%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {courses.map((course, index) => {
                const creditError = validateCredits(course.credits);
                const gradeError = validateGrade(course.grade, gradingSystem || []);

                return (
                  <tr key={course.id}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={course.course}
                        onChange={(e) => onUpdateCourse(index, 'course', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[44px] transition-colors"
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={course.credits}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              onUpdateCourse(index, 'credits', value);
                            }
                          }}
                          className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[44px] transition-colors ${
                            creditError && course.credits ? 'border-red-500 text-red-600' : ''
                          }`}
                          required
                        />
                        {creditError && course.credits && (
                          <div className="absolute left-0 -bottom-5 text-xs text-red-600">
                            {creditError}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={course.grade}
                          onChange={(e) => onUpdateCourse(index, 'grade', e.target.value)}
                          className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[44px] transition-colors ${
                            gradeError && course.grade ? 'border-red-500 text-red-600' : ''
                          }`}
                          required
                        />
                        {gradeError && course.grade && (
                          <div className="absolute left-0 -bottom-5 text-xs text-red-600">
                            {gradeError}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={course.weight}
                        onChange={(e) => onUpdateCourse(index, 'weight', e.target.value as CourseWeight)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[44px] transition-colors bg-white"
                      >
                        {weightOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onRemoveCourse(index)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Remove course"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}