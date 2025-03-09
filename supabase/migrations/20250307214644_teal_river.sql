/*
  # Create grading systems table

  1. New Tables
    - `grading_systems`
      - `id` (uuid, primary key)
      - `country_name` (text, not null)
      - `grading_mode` (text, not null)
      - `local_grade` (text)
      - `us_grade_letter` (text)
      - `grade_range_min` (numeric)
      - `grade_range_max` (numeric)
      - `grade_points` (numeric, not null)
      - `grade_description` (text)
      - `attention` (text)
      - `additional_scale_info` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `grading_systems` table
    - Add policy for public read access
*/

-- Create the grading_systems table if it doesn't exist
CREATE TABLE IF NOT EXISTS grading_systems (
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
  updated_at timestamptz DEFAULT now()
);

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_grading_systems_country_mode'
  ) THEN
    CREATE INDEX idx_grading_systems_country_mode 
    ON grading_systems (country_name, grading_mode);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_grading_systems_country_name'
  ) THEN
    CREATE INDEX idx_grading_systems_country_name 
    ON grading_systems (country_name);
  END IF;
END $$;

-- Drop existing constraint if it exists and create new one
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'grading_systems_country_mode_grade_unique'
  ) THEN
    ALTER TABLE grading_systems 
    DROP CONSTRAINT grading_systems_country_mode_grade_unique;
  END IF;

  ALTER TABLE grading_systems
  ADD CONSTRAINT grading_systems_country_mode_grade_unique 
  UNIQUE (country_name, grading_mode, local_grade);
EXCEPTION
  WHEN others THEN
    NULL; -- Ignore any errors
END $$;

-- Enable Row Level Security
ALTER TABLE grading_systems ENABLE ROW LEVEL SECURITY;

-- Create or replace the policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Anyone can read grading systems'
  ) THEN
    DROP POLICY "Anyone can read grading systems" ON grading_systems;
  END IF;
END $$;

CREATE POLICY "Anyone can read grading systems"
ON grading_systems
FOR SELECT
TO public
USING (true);

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate the trigger
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_grading_systems_updated_at'
  ) THEN
    DROP TRIGGER IF EXISTS update_grading_systems_updated_at 
    ON grading_systems;
  END IF;
END $$;

CREATE TRIGGER update_grading_systems_updated_at
    BEFORE UPDATE ON grading_systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();