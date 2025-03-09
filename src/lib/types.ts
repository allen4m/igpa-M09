export type GradeSystem = {
  country_name: string;
  grading_mode: string;
  local_grade: string;
  us_grade_letter: string;
  grade_range_min: number;
  grade_range_max: number;
  grade_points: number;
  grade_description?: string;
  attention?: string;
  additional_scale_info?: string;
};