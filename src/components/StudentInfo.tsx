import React, { useState } from 'react';
import { StudentDetails, TranscriptStatus } from '../types';

type StudentInfoProps = {
  studentDetails: StudentDetails;
  transcriptStatus: TranscriptStatus;
  schoolName: string;
  onStudentDetailsChange: (details: Partial<StudentDetails>) => void;
  onTranscriptStatusChange: (status: Partial<TranscriptStatus>) => void;
  onSchoolNameChange: (value: string) => void;
};

export default function StudentInfo({
  studentDetails,
  transcriptStatus,
  schoolName,
  onStudentDetailsChange,
  onTranscriptStatusChange,
  onSchoolNameChange
}: StudentInfoProps) {
  const [dateError, setDateError] = useState('');

  const validateDate = (value: string, field: 'dateOfBirth' | 'graduationDate') => {
    if (!value) {
      setDateError('');
      return;
    }

    const regex = field === 'dateOfBirth' 
      ? /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/
      : /^(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(value)) {
      setDateError(`Use format ${field === 'dateOfBirth' ? 'MM/DD/YYYY' : 'MM/YYYY'}`);
      return;
    }

    const currentYear = new Date().getFullYear();
    const year = parseInt(value.split('/').pop() || '0', 10);

    if (field === 'dateOfBirth') {
      if (year > currentYear || year < currentYear - 100) {
        setDateError('Invalid birth year');
        return;
      }
    } else {
      if (year < 2010 || year > currentYear + 10) {
        setDateError('Year must be between 2010 and ' + (currentYear + 10));
        return;
      }
    }

    setDateError('');
  };

  const formatDate = (value: string, field: 'dateOfBirth' | 'graduationDate') => {
    let formatted = value.replace(/\D/g, '');
    
    if (field === 'dateOfBirth') {
      if (formatted.length >= 4) {
        formatted = formatted.slice(0, 2) + '/' + 
                   formatted.slice(2, 4) + '/' + 
                   formatted.slice(4, 8);
      } else if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
      }
    } else {
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 6);
      }
    }

    return formatted;
  };

  return (
    <div className="space-y-6 mb-8 bg-gray-50 p-6 rounded-lg">
      {/* Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={studentDetails.fullName}
            onChange={(e) => onStudentDetailsChange({ fullName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="text"
            value={studentDetails.dateOfBirth}
            onChange={(e) => {
              const formatted = formatDate(e.target.value, 'dateOfBirth');
              onStudentDetailsChange({ dateOfBirth: formatted });
              validateDate(formatted, 'dateOfBirth');
            }}
            placeholder="MM/DD/YYYY"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
          />
        </div>
      </div>

      {/* School and Nationality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => onSchoolNameChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
            placeholder="Enter school name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <input
            type="text"
            value={studentDetails.nationality}
            onChange={(e) => onStudentDetailsChange({ nationality: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
            placeholder="Enter nationality"
          />
        </div>
      </div>

      {/* Graduation Date and Transcript Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={studentDetails.graduationDate}
              onChange={(e) => {
                const formatted = formatDate(e.target.value, 'graduationDate');
                onStudentDetailsChange({ graduationDate: formatted });
                validateDate(formatted, 'graduationDate');
              }}
              placeholder="MM/YYYY"
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white ${
                dateError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {dateError && (
              <p className="absolute left-0 top-full mt-1 text-xs text-red-500">
                {dateError}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transcript Status
          </label>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={transcriptStatus.isOfficial ? 'yes' : 'no'}
              onChange={(e) => onTranscriptStatusChange({ 
                isOfficial: e.target.value === 'yes' 
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
            >
              <option value="yes">Official</option>
              <option value="no">Unofficial</option>
            </select>
            <select
              value={transcriptStatus.isFinal ? 'yes' : 'no'}
              onChange={(e) => onTranscriptStatusChange({ 
                isFinal: e.target.value === 'yes' 
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px] bg-white"
            >
              <option value="yes">Final</option>
              <option value="no">In Progress</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}