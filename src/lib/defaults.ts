import type { GradeSystem } from './types';

export const defaultGradingSystems: Record<string, GradeSystem[]> = {
  'United States': [
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'A',
      us_grade_letter: 'A',
      grade_range_min: 93,
      grade_range_max: 100,
      grade_points: 4.0,
      grade_description: 'Excellent'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'A-',
      us_grade_letter: 'A-',
      grade_range_min: 90,
      grade_range_max: 92.99,
      grade_points: 3.7,
      grade_description: 'Very Good'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'B+',
      us_grade_letter: 'B+',
      grade_range_min: 87,
      grade_range_max: 89.99,
      grade_points: 3.3,
      grade_description: 'Good'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'B',
      us_grade_letter: 'B',
      grade_range_min: 83,
      grade_range_max: 86.99,
      grade_points: 3.0,
      grade_description: 'Above Average'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'B-',
      us_grade_letter: 'B-',
      grade_range_min: 80,
      grade_range_max: 82.99,
      grade_points: 2.7,
      grade_description: 'Average'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'C+',
      us_grade_letter: 'C+',
      grade_range_min: 77,
      grade_range_max: 79.99,
      grade_points: 2.3,
      grade_description: 'Below Average'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'C',
      us_grade_letter: 'C',
      grade_range_min: 73,
      grade_range_max: 76.99,
      grade_points: 2.0,
      grade_description: 'Fair'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'C-',
      us_grade_letter: 'C-',
      grade_range_min: 70,
      grade_range_max: 72.99,
      grade_points: 1.7,
      grade_description: 'Poor'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'D+',
      us_grade_letter: 'D+',
      grade_range_min: 67,
      grade_range_max: 69.99,
      grade_points: 1.3,
      grade_description: 'Very Poor'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'D',
      us_grade_letter: 'D',
      grade_range_min: 63,
      grade_range_max: 66.99,
      grade_points: 1.0,
      grade_description: 'Passing'
    },
    {
      country_name: 'United States',
      grading_mode: 'Standard',
      local_grade: 'F',
      us_grade_letter: 'F',
      grade_range_min: 0,
      grade_range_max: 62.99,
      grade_points: 0.0,
      grade_description: 'Failing'
    }
  ],
  'China': [
    {
      country_name: 'China',
      grading_mode: 'Numeric grade',
      local_grade: '90-100',
      us_grade_letter: 'A',
      grade_range_min: 90,
      grade_range_max: 100,
      grade_points: 4.0,
      grade_description: 'Excellent',
      attention: 'Chinese numeric grading system uses a 100-point scale. Enter the exact numeric grade received (e.g., 85).'
    },
    {
      country_name: 'China',
      grading_mode: 'Numeric grade',
      local_grade: '80-89',
      us_grade_letter: 'B',
      grade_range_min: 80,
      grade_range_max: 89,
      grade_points: 3.0,
      grade_description: 'Good'
    },
    {
      country_name: 'China',
      grading_mode: 'Numeric grade',
      local_grade: '70-79',
      us_grade_letter: 'C',
      grade_range_min: 70,
      grade_range_max: 79,
      grade_points: 2.0,
      grade_description: 'Average'
    },
    {
      country_name: 'China',
      grading_mode: 'Numeric grade',
      local_grade: '60-69',
      us_grade_letter: 'D',
      grade_range_min: 60,
      grade_range_max: 69,
      grade_points: 1.0,
      grade_description: 'Pass'
    },
    {
      country_name: 'China',
      grading_mode: 'Numeric grade',
      local_grade: '0-59',
      us_grade_letter: 'F',
      grade_range_min: 0,
      grade_range_max: 59,
      grade_points: 0.0,
      grade_description: 'Fail'
    }
  ]
};