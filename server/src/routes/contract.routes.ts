import { Router } from 'express'
import { body } from 'express-validator'
import contractController from '../controllers/contract.controller'
import { authenticate } from '../middleware/auth.middleware'
import { validateRequest } from '../middleware/validation.middleware'

const router = Router()

// Apply authentication middleware to all routes
router.use(authenticate)

// Validation middleware
const validateCreateContract = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('contract_type').notEmpty().withMessage('Contract type is required'),
  body('party_1_name').notEmpty().withMessage('Party 1 name is required'),
  body('party_1_role').notEmpty().withMessage('Party 1 role is required'),
  body('party_1_address').optional().isString().withMessage('Party 1 address must be a string'),
  body('party_2_name').notEmpty().withMessage('Party 2 name is required'),
  body('party_2_role').notEmpty().withMessage('Party 2 role is required'),
  body('party_2_address').optional().isString().withMessage('Party 2 address must be a string'),
  body('contract_purpose').notEmpty().withMessage('Contract purpose is required'),
  body('scope_of_work').notEmpty().withMessage('Scope of work is required'),
  body('contract_duration').notEmpty().withMessage('Contract duration is required'),
  body('start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('end_date').optional().isISO8601().withMessage('End date must be a valid date'),
  body('auto_renewal').optional().isBoolean().withMessage('Auto renewal must be a boolean'),
  body('payment_type').notEmpty().withMessage('Payment type is required'),
  body('payment_amount').isNumeric().withMessage('Payment amount is required and must be a number'),
  body('currency').optional().isString().withMessage('Currency must be a string'),
  body('payment_schedule').notEmpty().withMessage('Payment schedule is required'),
  body('confidentiality_clause').optional().isBoolean().withMessage('Confidentiality clause must be a boolean'),
  body('non_compete_clause').optional().isBoolean().withMessage('Non-compete clause must be a boolean'),
  body('termination_conditions').optional().isString().withMessage('Termination conditions must be a string'),
  body('metadata').optional().isObject().withMessage('Metadata must be an object'),
  validateRequest,
]

const validateUpdateContract = [
  body('title').optional().isString().withMessage('Title must be a string'),
  body('content').optional().isString().withMessage('Content must be a string'),
  body('contract_type').optional().isString().withMessage('Contract type must be a string'),
  body('party_1_name').optional().isString().withMessage('Party 1 name must be a string'),
  body('party_1_role').optional().isString().withMessage('Party 1 role must be a string'),
  body('party_1_address').optional().isString().withMessage('Party 1 address must be a string'),
  body('party_2_name').optional().isString().withMessage('Party 2 name must be a string'),
  body('party_2_role').optional().isString().withMessage('Party 2 role must be a string'),
  body('party_2_address').optional().isString().withMessage('Party 2 address must be a string'),
  body('contract_purpose').optional().isString().withMessage('Contract purpose must be a string'),
  body('scope_of_work').optional().isString().withMessage('Scope of work must be a string'),
  body('contract_duration').optional().isString().withMessage('Contract duration must be a string'),
  body('start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('end_date').optional().isISO8601().withMessage('End date must be a valid date'),
  body('auto_renewal').optional().isBoolean().withMessage('Auto renewal must be a boolean'),
  body('payment_type').optional().isString().withMessage('Payment type must be a string'),
  body('payment_amount').optional().isNumeric().withMessage('Payment amount must be a number'),
  body('currency').optional().isString().withMessage('Currency must be a string'),
  body('payment_schedule').optional().isString().withMessage('Payment schedule must be a string'),
  body('confidentiality_clause').optional().isBoolean().withMessage('Confidentiality clause must be a boolean'),
  body('non_compete_clause').optional().isBoolean().withMessage('Non-compete clause must be a boolean'),
  body('termination_conditions').optional().isString().withMessage('Termination conditions must be a string'),
  body('status').optional().isString().withMessage('Status must be a string'),
  body('signed').optional().isBoolean().withMessage('Signed must be a boolean'),
  body('signedAt').optional().isISO8601().withMessage('SignedAt must be a valid date'),
  body('expiresAt').optional().isISO8601().withMessage('ExpiresAt must be a valid date'),
  body('metadata').optional().isObject().withMessage('Metadata must be an object'),
  validateRequest,
]

const validateGenerateContract = [
  body('title').optional().isString().withMessage('Title must be a string'),
  body('contract_type').optional().isString().withMessage('Contract type must be a string'),
  body('party_1_name').optional().isString().withMessage('Party 1 name must be a string'),
  body('party_1_role').optional().isString().withMessage('Party 1 role must be a string'),
  body('party_1_address').optional().isString().withMessage('Party 1 address must be a string'),
  body('party_2_name').optional().isString().withMessage('Party 2 name must be a string'),
  body('party_2_role').optional().isString().withMessage('Party 2 role must be a string'),
  body('party_2_address').optional().isString().withMessage('Party 2 address must be a string'),
  body('contract_purpose').optional().isString().withMessage('Contract purpose must be a string'),
  body('scope_of_work').optional().isString().withMessage('Scope of work must be a string'),
  body('contract_duration').optional().isString().withMessage('Contract duration must be a string'),
  body('start_date').optional().isString().withMessage('Start date must be a string'),
  body('end_date').optional().isString().withMessage('End date must be a string'),
  body('auto_renewal').optional().isBoolean().withMessage('Auto renewal must be a boolean'),
  body('payment_type').optional().isString().withMessage('Payment type must be a string'),
  body('payment_amount').optional().isNumeric().withMessage('Payment amount must be a number'),
  body('currency').optional().isString().withMessage('Currency must be a string'),
  body('payment_schedule').optional().isString().withMessage('Payment schedule must be a string'),
  body('confidentiality_clause').optional().isBoolean().withMessage('Confidentiality clause must be a boolean'),
  body('non_compete_clause').optional().isBoolean().withMessage('Non-compete clause must be a boolean'),
  body('termination_conditions').optional().isString().withMessage('Termination conditions must be a string'),
  validateRequest,
]

// Contract routes
router.post('/', validateCreateContract, contractController.create)
router.get('/', contractController.findAll)
router.get('/:id', contractController.findById)
router.put('/:id', validateUpdateContract, contractController.update)
router.delete('/:id', contractController.delete)

// OpenAI contract generation route
router.post('/generate', validateGenerateContract, contractController.generateContract)

// Export contract to PDF route
router.get('/export/:id/pdf', authenticate, contractController.exportToPdf)

// Analyze contract for risks
router.get('/analyze/:contractId', authenticate, contractController.analyzeContract)

export default router
