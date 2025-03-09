export function validatePdfFile(file: File): string | null {
  // Check file type
  if (!file.type || !['application/pdf', 'text/plain'].includes(file.type)) {
    return 'Please upload a PDF or text file';
  }

  // Check file size (10MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'File size must be less than 10MB';
  }

  return null;
}