/*
  # Initial Schema Setup for GPA Calculator

  1. New Tables
    - `grading_systems`
      - `id` (uuid, primary key)
      - `country_name` (text)
      - `grading_mode` (text)
      - `local_grade` (text)
      - `us_grade_letter` (text)
      - `grade_range_min` (numeric)
      - `grade_range_max` (numeric)
      - `grade_points` (numeric)
      - `grade_description` (text)
      - `attention` (text)
      - `additional_scale_info` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `students`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `date_of_birth` (date)
      - `nationality` (text)
      - `graduation_date` (date)
      - `school_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `transcripts`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references students)
      - `is_official` (boolean)
      - `is_final` (boolean)
      - `country` (text)
      - `grading_mode` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `courses`
      - `id` (uuid, primary key)
      - `transcript_id` (uuid, references transcripts)
      - `name` (text)
      - `credits` (numeric)
      - `grade` (text)
      - `weight` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read their own data
      - Create and update their own records
      - Delete their own records
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grading Systems Table
CREATE TABLE grading_systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  grading_mode text NOT NULL,
  local_grade text,
  us_grade_letter text,
  grade_range_min numeric,
  grade_range_max numeric,
  grade_points numeric NOT NULL,
  grade_description text,
  attention text,
  additional_scale_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT grading_systems_country_mode_grade_unique UNIQUE (country_name, grading_mode, local_grade)
);

-- Students Table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text NOT NULL,
  date_of_birth date,
  nationality text,
  graduation_date date,
  school_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transcripts Table
CREATE TABLE transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students ON DELETE CASCADE NOT NULL,
  is_official boolean DEFAULT false,
  is_final boolean DEFAULT false,
  country text NOT NULL,
  grading_mode text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses Table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transcript_id uuid REFERENCES transcripts ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  credits numeric NOT NULL CHECK (credits > 0 AND credits <= 12),
  grade text NOT NULL,
  weight text NOT NULL CHECK (weight IN ('regular', 'honors', 'ap')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE grading_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies for grading_systems
CREATE POLICY "Grading systems are readable by all authenticated users"
  ON grading_systems
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for students
CREATE POLICY "Users can read own student profile"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own student profile"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own student profile"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for transcripts
CREATE POLICY "Users can read own transcripts"
  ON transcripts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = transcripts.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transcripts"
  ON transcripts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = transcripts.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own transcripts"
  ON transcripts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = transcripts.student_id
      AND students.user_id = auth.uid()
    )
  );

-- Policies for courses
CREATE POLICY "Users can read own courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM transcripts
      JOIN students ON students.id = transcripts.student_id
      WHERE transcripts.id = courses.transcript_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM transcripts
      JOIN students ON students.id = transcripts.student_id
      WHERE transcripts.id = courses.transcript_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM transcripts
      JOIN students ON students.id = transcripts.student_id
      WHERE transcripts.id = courses.transcript_id
      AND students.user_id = auth.uid()
    )
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_grading_systems_updated_at
    BEFORE UPDATE ON grading_systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transcripts_updated_at
    BEFORE UPDATE ON transcripts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();