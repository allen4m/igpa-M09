import { describe, it, expect } from 'vitest';
import { calculateGPA, validateGradeValue, validateCreditHours } from '../gpa';
import { CourseEntry } from '../../types';
import { GradeSystem } from '../airtable';

describe('GPA Calculation', () => {
  const mockGradingSystem: GradeSystem[] = [
    {
      country_name: 'Test',
      grading_mode: 'Standard',
      local_grade: 'A',
      us_grade_letter: 'A',
      grade_range_min: 93,
      grade_range_max: 100,
      grade_points: 4.0
    },
    {
      country_name: 'Test',
      grading_mode: 'Standard',
      local_grade: 'B',
      us_grade_letter: 'B',
      grade_range_min: 83,
      grade_range_max: 86,
      grade_points: 3.0
    }
  ];

  it('should calculate unweighted GPA correctly', () => {
    const courses: CourseEntry[] = [
      { id: '1', course: 'Math', credits: '3', grade: 'A', weight: 'regular' },
      { id: '2', course: 'English', credits: '3', grade: 'B', weight: 'regular' }
    ];

    const { gpa } = calculateGPA(courses, mockGradingSystem, false);
    expect(gpa).toBe(3.5); // (4.0 * 3 + 3.0 * 3) / 6
  });

  it('should calculate weighted GPA correctly', () => {
    const courses: CourseEntry[] = [
      { id: '1', course: 'Math', credits: '3', grade: 'A', weight: 'ap' },
      { id: '2', course: 'English', credits: '3', grade: 'B', weight: 'honors' }
    ];

    const { gpa } = calculateGPA(courses, mockGradingSystem, true);
    expect(gpa).toBe(4.25); // ((4.0 + 1.0) * 3 + (3.0 + 0.5) * 3) / 6
  });

  it('should handle invalid grades', () => {
    const courses: CourseEntry[] = [
      { id: '1', course: 'Math', credits: '3', grade: 'Z', weight: 'regular' }
    ];

    const result = calculateGPA(courses, mockGradingSystem);
    expect(result.gpa).toBeNull();
    expect(result.error).toContain('Invalid grade for course');
  });

  it('should handle invalid credits', () => {
    const courses: CourseEntry[] = [
      { id: '1', course: 'Math', credits: '-1', grade: 'A', weight: 'regular' }
    ];

    const result = calculateGPA(courses, mockGradingSystem);
    expect(result.gpa).toBeNull();
    expect(result.error).toContain('Invalid credits for course');
  });
});

describe('Validation Functions', () => {
  it('should validate grade values correctly', () => {
    expect(validateGradeValue(4.0)).toBe(true);
    expect(validateGradeValue(3.5)).toBe(true);
    expect(validateGradeValue(-1)).toBe(false);
    expect(validateGradeValue(4.1)).toBe(false);
  });

  it('should validate credit hours correctly', () => {
    expect(validateCreditHours(3)).toBe(true);
    expect(validateCreditHours(1.5)).toBe(true);
    expect(validateCreditHours(0)).toBe(false);
    expect(validateCreditHours(13)).toBe(false);
    expect(validateCreditHours(1.75)).toBe(false);
  });
});