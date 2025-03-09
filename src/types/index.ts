export type CourseWeight = 'regular' | 'honors' | 'ap';

export type StudentDetails = {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  graduationDate: string;
};

export type TranscriptStatus = {
  isOfficial: boolean;
  isFinal: boolean;
};

export type CourseEntry = {
  id: string;
  course: string;
  grade: string;
  credits: string;
  weight: CourseWeight;
};

export type GradingSystem = {
  id: string;
  country: string;
  grades: {
    grade: string;
    min: number;
    max: number;
    gpa: number;
  }[];
};

export type ExtractedCourse = {
  name: string;
  grade: string;
  credits: string;
  term: string;
};