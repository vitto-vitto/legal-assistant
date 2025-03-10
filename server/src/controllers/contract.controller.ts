import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import contractService from '../services/contract.service'
import { openaiService } from '../services/openai.service'
import { pdfExportService } from '../services/pdf-export.service'

export class ContractController {
  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const contract = await contractService.create(userId, req.body)
      res.status(201).json(contract)
    } catch (error) {
      console.error('Error creating contract:', error)
      res.status(500).json({ message: 'Error creating contract' })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const contracts = await contractService.findAll(userId)
      res.json(contracts)
    } catch (error) {
      console.error('Error retrieving contracts:', error)
      res.status(500).json({ message: 'Error retrieving contracts' })
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      try {
        const contract = await contractService.findById(req.params.id, userId)
        res.json(contract)
      } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
          return res.status(404).json({ message: error.message })
        }
        throw error
      }
    } catch (error) {
      console.error('Error retrieving contract:', error)
      res.status(500).json({ message: 'Error retrieving contract' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      try {
        const contract = await contractService.update(req.params.id, userId, req.body)
        res.json(contract)
      } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
          return res.status(404).json({ message: error.message })
        }
        throw error
      }
    } catch (error) {
      console.error('Error updating contract:', error)
      res.status(500).json({ message: 'Error updating contract' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      try {
        await contractService.delete(req.params.id, userId)
        res.status(204).send()
      } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
          return res.status(404).json({ message: error.message })
        }
        throw error
      }
    } catch (error) {
      console.error('Error deleting contract:', error)
      res.status(500).json({ message: 'Error deleting contract' })
    }
  }

  async generateContract(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // No need to check authentication since we're using a simplified auth system
      const contractData = req.body

      // Generate contract content using OpenAI
      const generatedContent = await openaiService.generateContract(contractData)
      
      // Return the generated contract content
      res.json({ 
        content: generatedContent,
        message: 'Contract generated successfully'
      })
    } catch (error) {
      console.error('Error generating contract:', error)
      res.status(500).json({ message: 'Error generating contract' })
    }
  }
  
  /**
   * Analyze contract content for risks and issues
   */
  async analyzeContract(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const contractId = req.params.contractId
      
      try {
        // Get the contract content
        const contract = await contractService.findById(contractId, userId)
        
        if (!contract || !contract.content) {
          return res.status(400).json({ 
            message: 'Contract has no content to analyze' 
          })
        }
        
        console.log(`Analyzing contract ${contractId} with content length: ${contract.content.length}`);
        
        try {
          // Analyze the contract content for risks
          const analysisResults = await openaiService.analyzeContractRisks(contract.content);
          
          // Return the analysis results
          return res.json({ 
            success: true,
            contractId: contract.id,
            contractTitle: contract.title,
            analysis: analysisResults 
          });
        } catch (analysisError) {
          console.error('Error during OpenAI analysis:', analysisError);
          return res.status(500).json({ 
            message: 'Error analyzing contract with AI',
            error: analysisError instanceof Error ? analysisError.message : 'Unknown analysis error'
          });
        }
      } catch (contractError) {
        if (contractError instanceof Error && contractError.name === 'NotFoundError') {
          return res.status(404).json({ message: contractError.message });
        }
        console.error('Error retrieving contract:', contractError);
        return res.status(500).json({ 
          message: 'Error retrieving contract',
          error: contractError instanceof Error ? contractError.message : 'Unknown contract error'
        });
      }
    } catch (error) {
      console.error('Error analyzing contract:', error)
      return res.status(500).json({ 
        message: 'Error analyzing contract',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  async exportToPdf(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }

      const contractId = req.params.id
      const contract = await contractService.findById(contractId, userId)
      
      // Generate PDF
      const pdfPath = await pdfExportService.generateContractPdf(contract)
      
      // Set headers for PDF download
      const filename = `contract_${contract.id}.pdf`
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      res.setHeader('Content-Type', 'application/pdf')
      
      // Send the file
      res.download(pdfPath, filename, (err) => {
        if (err) {
          console.error('Error sending PDF:', err)
          res.status(500).send({ message: 'Error downloading PDF' })
        }
      })
    } catch (error) {
      console.error('Error exporting contract to PDF:', error)
      res.status(500).json({ message: 'Error exporting contract to PDF' })
    }
  }
}

export default new ContractController()
