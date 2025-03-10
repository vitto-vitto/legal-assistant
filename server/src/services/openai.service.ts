import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
});

class OpenAIService {
  async generateContract(contractData: any): Promise<string> {
    try {
      // Construct prompt for the contract generation
      const prompt = this.buildContractPrompt(contractData);
      
      console.log('Sending request to OpenAI API...');
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4', // Use GPT-4 for complex legal document generation
        messages: [
          {
            role: 'system',
            content: 'You are an expert legal contract writer. Your task is to draft comprehensive, legally sound contracts based on the information provided. Use formal legal language, proper formatting, and ensure all critical clauses are included.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });
      
      // Extract and return the generated contract
      const contractText = response.choices[0]?.message?.content || '';
      return contractText;
    } catch (error) {
      console.error('Error generating contract with OpenAI:', error);
      throw new Error('Failed to generate contract using AI');
    }
  }

  /**
   * Extracts structured information from contract text using OpenAI
   */
  async extractContractData(prompt: string): Promise<any> {
    try {
      console.log('Extracting contract data with OpenAI...');
      
      // For the demo, simulate a response without actually calling OpenAI
      // In a production environment, we would use real API calls
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return sample contract data structure
      // In production, we would parse the actual response from:
      /*
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a legal document analysis expert. Extract structured information from the contract described.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      });
      
      const resultText = response.choices[0]?.message?.content || '';
      return JSON.parse(resultText);
      */
      
      return {
        title: "Service Agreement",
        contract_type: "SERVICE",
        parties: [
          { name: "ABC Corporation", role: "Service Provider", address: "123 Business St, City" },
          { name: "XYZ Inc.", role: "Client", address: "456 Commerce Ave, Metropolis" }
        ],
        contract_purpose: "Professional consulting services in software development",
        scope_of_work: "Development of custom software solutions, including design, implementation, testing, and deployment of web applications",
        duration: {
          start_date: "2025-03-01",
          end_date: "2026-02-28"
        },
        payment: {
          amount: "10000",
          currency: "USD",
          payment_type: "FIXED",
          payment_schedule: "MONTHLY"
        },
        confidentiality_clause: true,
        non_compete_clause: false,
        termination_conditions: "30 days written notice required for early termination",
        estimatedPages: 8
      };
    } catch (error) {
      console.error('Error extracting contract data with OpenAI:', error);
      throw new Error('Failed to extract contract data using AI');
    }
  }
  
  /**
   * Analyzes contract content for legal risks and critical clauses
   */
  async analyzeContractRisks(contractContent: string): Promise<any> {
    try {
      console.log('Analyzing contract risks with OpenAI...');
      
      // Safety check for null or empty content
      if (!contractContent || contractContent.trim() === '') {
        console.warn('Empty contract content provided for analysis');
        return {
          overallRiskAssessment: "Unknown",
          identifiedRisks: [],
          missingClauses: ["Cannot analyze empty contract"],
          ambiguousTerms: []
        };
      }
      
      // Safely truncate content if it's too long
      const safeContent = contractContent.substring(0, Math.min(contractContent.length, 2500));
      
      // In production, we would send the actual contract content to OpenAI
      const prompt = `
Analyze the following contract content and identify potential risks, ambiguities, or missing critical clauses. 
Focus on legal, financial, and operational risks.

Here's a partial content of the contract to analyze:
${safeContent}... (contract continues)

Provide a structured analysis with the following:
1. Overall risk assessment (Low, Medium, High)
2. Identified risks (list each with severity rating)
3. Missing critical clauses
4. Ambiguous or vague terms
5. Recommended improvements

Return the analysis as a valid JSON object.
      `;
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, we would use:
      /*
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a legal document analysis expert specializing in risk assessment. Provide detailed contract analysis focusing on risks and critical issues.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      });
      
      const resultText = response.choices[0]?.message?.content || '';
      return JSON.parse(resultText);
      */
      
      // Return a sample analysis
      return {
        overallRiskAssessment: "Medium",
        identifiedRisks: [
          {
            description: "Inadequate termination notice period",
            category: "Operational",
            severity: "High",
            context: "The contract only allows for 30 days notice for termination, which may be insufficient for proper transition",
            recommendation: "Extend notice period to 60-90 days"
          },
          {
            description: "Vague scope of work definition",
            category: "Legal",
            severity: "Medium",
            context: "The scope lacks specific deliverables and acceptance criteria",
            recommendation: "Define clear deliverables, milestones, and acceptance criteria"
          },
          {
            description: "No liability cap specified",
            category: "Financial",
            severity: "High",
            context: "Unlimited liability exposure for both parties",
            recommendation: "Add liability cap proportional to contract value"
          },
          {
            description: "Unclear intellectual property ownership",
            category: "Legal",
            severity: "Medium",
            context: "IP rights transfer is not explicitly defined",
            recommendation: "Specify IP ownership and license terms clearly"
          }
        ],
        missingClauses: [
          "Dispute resolution mechanism",
          "Force majeure",
          "Data protection and privacy",
          "Insurance requirements"
        ],
        ambiguousTerms: [
          {
            term: "reasonable efforts",
            context: "Service provider shall use reasonable efforts...",
            recommendation: "Define specific performance standards or SLAs"
          },
          {
            term: "timely manner",
            context: "Deliverables will be provided in a timely manner",
            recommendation: "Specify exact timeframes for each deliverable"
          }
        ],
        recommendedImprovements: [
          "Add detailed payment terms including late payment penalties",
          "Include change management procedure",
          "Specify reporting requirements and frequency",
          "Add clear termination for convenience clause",
          "Include specific compliance requirements"
        ]
      };
    } catch (error) {
      console.error('Error analyzing contract risks with OpenAI:', error);
      throw new Error('Failed to analyze contract risks using AI');
    }
  }

  /**
   * Extracts contract information from provided text content
   */
  async extractContractInfo(contractText: string): Promise<any> {
    try {
      console.log('Analyzing contract with OpenAI for information extraction...');
      
      // Safety check for null or empty content
      if (!contractText || contractText.trim() === '') {
        console.warn('Empty contract text provided for extraction');
        return {
          title: 'Unknown Contract',
          contract_type: 'OTHER',
          content: '',
          parties: [],
          contract_purpose: '',
          scope_of_work: '',
          duration: {
            start_date: null,
            end_date: null
          },
          payment: {
            payment_type: 'OTHER',
            amount: '0',
            currency: 'BRL',
            payment_schedule: 'OTHER'
          },
          confidentiality_clause: false,
          non_compete_clause: false,
          termination_conditions: ''
        };
      }
      
      // In production, we would use:
      /*
      const prompt = `
        You are a legal document analyzer. Extract the following information from this contract text:
        
        1. Contract title
        2. Contract type (e.g., SERVICE, NDA, EMPLOYMENT, LEASE, etc.)
        3. Party information (names, roles, addresses)
        4. Contract purpose
        5. Scope of work
        6. Contract duration (start date, end date)
        7. Payment information (amount, schedule, currency)
        8. Whether it includes confidentiality clauses
        9. Whether it includes non-compete clauses
        10. Termination conditions
        
        Contract text:
        ${contractText.substring(0, 3000)}... (contract continues)
        
        Return ONLY a valid JSON object with these fields.
      `;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a legal document analyzer capable of extracting structured information from contracts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });
      
      const resultText = response.choices[0]?.message?.content || '{}';
      return JSON.parse(resultText);
      */
      
      // For the demo, return a sample extraction result
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6);
      
      return {
        title: "Service Agreement",
        contract_type: "SERVICE",
        content: contractText,
        parties: [
          {
            name: "TechCorp",
            role: "Service Provider",
            address: "123 Tech Street, Silicon Valley, CA"
          },
          {
            name: "ClientName",
            role: "Client",
            address: "456 Client Avenue, Business District, NY"
          }
        ],
        contract_purpose: "Provision of technical consulting services",
        scope_of_work: "Technical consulting as described in Schedule A",
        duration: {
          start_date: currentDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0]
        },
        payment: {
          payment_type: "FIXED",
          amount: "10000",
          currency: "BRL",
          payment_schedule: "MONTHLY"
        },
        confidentiality_clause: true,
        non_compete_clause: false,
        termination_conditions: "30 days written notice by either party"
      };
    } catch (error) {
      console.error('Error extracting contract information:', error);
      throw error;
    }
  }

  private buildContractPrompt(data: any): string {
    // Create a detailed prompt based on contract data
    return `
Please generate a complete legal contract with the following specifications:

## Basic Information
- Title: ${data.title || 'Untitled Contract'}
- Type: ${data.contract_type || 'SERVICE'}

## Parties Involved
- Party 1 (${data.party_1_role || 'First Party'}): ${data.party_1_name || 'Party 1'}
  Address: ${data.party_1_address || 'Address not provided'}
- Party 2 (${data.party_2_role || 'Second Party'}): ${data.party_2_name || 'Party 2'}
  Address: ${data.party_2_address || 'Address not provided'}

## Contract Details
- Purpose: ${data.contract_purpose || 'Purpose not specified'}
- Scope of Work: ${data.scope_of_work || 'Scope not specified'}

## Duration
- Duration: ${data.contract_duration || 'Duration not specified'}
- Start Date: ${data.start_date || 'Start date not specified'}
- End Date: ${data.end_date || 'End date not specified'}
- Auto Renewal: ${data.auto_renewal ? 'Yes' : 'No'}

## Payment Information
- Payment Type: ${data.payment_type || 'Payment type not specified'}
- Payment Amount: ${data.payment_amount || 'Amount not specified'} ${data.currency || 'USD'}
- Payment Schedule: ${data.payment_schedule || 'Schedule not specified'}

## Specific Clauses
${data.confidentiality_clause ? '- Include a detailed confidentiality clause' : ''}
${data.non_compete_clause ? '- Include a detailed non-compete clause' : ''}
- Termination Conditions: ${data.termination_conditions || 'Standard termination terms'}

The contract should be structured with clear sections including definitions, rights and obligations of both parties, terms and conditions, legal provisions, signatures, etc. Format the contract in a professional legal document style.
`;
  }
}

export const openaiService = new OpenAIService();
