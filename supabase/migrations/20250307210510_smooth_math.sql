/*
  # Create grading systems table

  1. New Tables
    - `grading_systems`
      - `id` (uuid, primary key)
      - `country_name` (text, not null)
      - `grading_mode` (text, not null)
      - `local_grade` (text)
      - `us_grade_letter` (text)
      - `grade_range_min` (numeric, not null)
      - `grade_range_max` (numeric, not null)
      - `grade_points` (numeric, not null)
      - `grade_description` (text)
      - `attention` (text)
      - `additional_scale_info` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `grading_systems` table
    - Add policy for authenticated users to read grading systems
*/

-- Create the grading_systems table
CREATE TABLE IF NOT EXISTS grading_systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  grading_mode text NOT NULL,
  local_grade text,
  us_grade_letter text,
  grade_range_min numeric NOT NULL,
  grade_range_max numeric NOT NULL,
  grade_points numeric NOT NULL,
  grade_description text,
  attention text,
  additional_scale_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE grading_systems ENABLE ROW LEVEL SECURITY;

-- Create policy for reading grading systems
CREATE POLICY "Anyone can read grading systems"
  ON grading_systems
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_grading_systems_country_name 
  ON grading_systems(country_name);

-- Create index for composite lookups
CREATE INDEX IF NOT EXISTS idx_grading_systems_country_mode
  ON grading_systems(country_name, grading_mode);

-- Add sample data for testing
INSERT INTO grading_systems (
  country_name, grading_mode, local_grade, us_grade_letter, 
  grade_range_min, grade_range_max, grade_points, grade_description
) VALUES 
  ('United States', 'Standard', 'A', 'A', 93, 100, 4.0, 'Excellent'),
  ('United States', 'Standard', 'A-', 'A-', 90, 92.99, 3.7, 'Very Good'),
  ('United States', 'Standard', 'B+', 'B+', 87, 89.99, 3.3, 'Good'),
  ('United States', 'Standard', 'B', 'B', 83, 86.99, 3.0, 'Above Average'),
  ('United States', 'Standard', 'B-', 'B-', 80, 82.99, 2.7, 'Average'),
  ('United States', 'Standard', 'C+', 'C+', 77, 79.99, 2.3, 'Below Average'),
  ('United States', 'Standard', 'C', 'C', 73, 76.99, 2.0, 'Fair'),
  ('United States', 'Standard', 'C-', 'C-', 70, 72.99, 1.7, 'Poor'),
  ('United States', 'Standard', 'D+', 'D+', 67, 69.99, 1.3, 'Very Poor'),
  ('United States', 'Standard', 'D', 'D', 63, 66.99, 1.0, 'Passing'),
  ('United States', 'Standard', 'F', 'F', 0, 62.99, 0.0, 'Failing');