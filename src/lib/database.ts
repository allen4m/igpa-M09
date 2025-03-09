import { supabase } from './supabase';
import type { GradeSystem } from './types';
import { defaultGradingSystems } from './defaults';

export async function fetchGradingSystems(): Promise<Record<string, GradeSystem[]>> {
  try {
    console.log('Fetching grading systems from Supabase...');
    const { data, error } = await supabase
      .from('grading_systems')
      .select('*')
      .order('grade_points', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data?.length) {
      console.log('No data found in Supabase, using defaults');
      return defaultGradingSystems;
    }

    console.log('Supabase data received:', data);

    const groupedData: Record<string, GradeSystem[]> = {};
    data.forEach((grade) => {
      if (!groupedData[grade.country_name]) {
        groupedData[grade.country_name] = [];
      }
      groupedData[grade.country_name].push({
        country_name: grade.country_name,
        grading_mode: grade.grading_mode,
        local_grade: grade.local_grade || '',
        us_grade_letter: grade.us_grade_letter || '',
        grade_range_min: grade.grade_range_min || 0,
        grade_range_max: grade.grade_range_max || 0,
        grade_points: grade.grade_points,
        grade_description: grade.grade_description || undefined,
        attention: grade.attention || undefined,
        additional_scale_info: grade.additional_scale_info || undefined
      });
    });

    return groupedData;
  } catch (error) {
    console.error('Error fetching grading systems:', error);
    console.log('Falling back to default grading systems');
    return defaultGradingSystems;
  }
}

export async function fetchCountries(): Promise<string[]> {
  try {
    console.log('Fetching countries from Supabase...');
    const { data, error } = await supabase
      .from('grading_systems')
      .select('country_name');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data?.length) {
      console.log('No countries found in Supabase, using defaults');
      return Object.keys(defaultGradingSystems);
    }

    console.log('Countries received from Supabase:', data);
    const uniqueCountries = [...new Set(data.map(row => row.country_name))];
    return uniqueCountries.sort();
  } catch (error) {
    console.error('Error fetching countries:', error);
    console.log('Falling back to default countries');
    return Object.keys(defaultGradingSystems);
  }
}