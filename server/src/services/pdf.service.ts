import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { openaiService } from './openai.service';

const prisma = new PrismaClient();

/**
 * Service for handling PDF files and extracting contract information using OpenAI
 */
export class PdfService {
  /**
   * Extracts contract information from a PDF buffer using OpenAI
   */
  async extractContractInfo(
    fileBuffer: Buffer,
    fileName: string,
    userId: string
  ) {
    try {
      // For the demo, we'll simulate PDF text extraction
      // In a production app, we'd use a PDF parser like pdf-parse
      console.log(`Extracting text from PDF: ${fileName}`);
      
      // Create a temporary file to store the PDF for reference
      const uploadDir = path.join(__dirname, '../../uploads');
      
      // Ensure uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, `${Date.now()}_${fileName}`);
      fs.writeFileSync(filePath, fileBuffer);
      
      const fileSize = fileBuffer.length;
      
      // In a real app, we'd extract text from the PDF here
      // For the demo, we'll pass a message to OpenAI that we're analyzing a PDF
      
      // Use OpenAI to extract contract information
      const contractInfo = await this.analyzeContractWithAI(fileName, fileSize);
      
      // Store the file information
      const document = await prisma.document.create({
        data: {
          userId,
          title: fileName.replace(/\.pdf$/i, ''),
          fileName,
          fileType: 'application/pdf',
          fileSize,
          filePath: filePath.replace(/\\/g, '/'),
          content: contractInfo.content || '',
          metadata: {
            extractedAt: new Date().toISOString(),
            extractionMethod: 'openai'
          }
        }
      });
      
      return {
        ...contractInfo,
        document
      };
    } catch (error) {
      console.error('Error extracting contract info:', error);
      throw error;
    }
  }
  
  /**
   * Analyzes contract with OpenAI to extract structured information
   */
  private async analyzeContractWithAI(fileName: string, fileSize: number) {
    try {
      // In a real app, this would use the extracted text from the PDF
      // For demo purposes, we'll generate mock contract data
      
      // Content that would normally be extracted from PDF
      const mockPdfContent = `SERVICES AGREEMENT
      
This Agreement dated ${new Date().toLocaleDateString()} is between TechCorp ("Service Provider") and ClientName ("Client").

Service Provider agrees to provide Client with technical consulting services as described in Schedule A.

Payment terms: Monthly payments of R$10,000.00, due on the 5th of each month.
Start date: ${new Date().toLocaleDateString()}
End date: ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}

The parties agree to maintain confidentiality of all information shared.`;
      
      // Simulate OpenAI analysis
      const analysisResult = await openaiService.extractContractInfo(mockPdfContent);
      
      return {
        ...analysisResult,
        title: fileName.replace(/\.pdf$/i, ''),
        content: mockPdfContent,
      };
    } catch (error) {
      console.error('Error analyzing contract with AI:', error);
      throw error;
    }
  }
}

export const pdfService = new PdfService();
