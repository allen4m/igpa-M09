export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      grading_systems: {
        Row: {
          id: string
          country_name: string
          grading_mode: string
          local_grade: string | null
          us_grade_letter: string | null
          grade_range_min: number | null
          grade_range_max: number | null
          grade_points: number
          grade_description: string | null
          attention: string | null
          additional_scale_info: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          country_name: string
          grading_mode: string
          local_grade?: string | null
          us_grade_letter?: string | null
          grade_range_min?: number | null
          grade_range_max?: number | null
          grade_points: number
          grade_description?: string | null
          attention?: string | null
          additional_scale_info?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          country_name?: string
          grading_mode?: string
          local_grade?: string | null
          us_grade_letter?: string | null
          grade_range_min?: number | null
          grade_range_max?: number | null
          grade_points?: number
          grade_description?: string | null
          attention?: string | null
          additional_scale_info?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}