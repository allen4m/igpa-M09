import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import { parseTranscriptWithAI } from './aiTranscriptParser';
import type { ExtractedCourse } from '../types';

// Initialize PDF.js worker with explicit version
const PDFJS_VERSION = version || '4.0.379';
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

export async function processPdfTranscript(
  file: File,
  onProgress: (progress: number) => void
): Promise<ExtractedCourse[]> {
  try {
    // Start progress
    onProgress(10);

    // Load and verify worker
    await verifyWorkerLoaded();
    onProgress(20);

    // Extract text from PDF
    const pdfText = await extractTextFromPdf(file);
    onProgress(50);
    
    if (!pdfText.trim()) {
      throw new Error('No text content found in PDF');
    }

    // Parse with AI
    const courses = await parseTranscriptWithAI(pdfText);
    onProgress(90);

    if (!courses || courses.length === 0) {
      throw new Error('No course information found in transcript');
    }

    // Complete
    onProgress(100);
    return courses;
  } catch (error) {
    console.error('PDF processing error:', error);
    throw error instanceof Error ? error : new Error('Failed to process PDF transcript');
  }
}

async function verifyWorkerLoaded(): Promise<void> {
  try {
    // Create a small test PDF to verify worker
    const testPdf = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10]);
    await getDocument({ data: testPdf }).promise;
  } catch (error) {
    throw new Error('PDF.js worker failed to initialize');
  }
}

async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    const numPages = pdf.numPages;
    
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}