import { Router } from 'express';
import { uploadContract, getUploadedContracts } from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all upload routes
router.use(authenticate);

// Upload contract PDF and have AI extract its information
router.post('/contract', uploadContract);

// Get all uploaded contracts for a user
router.get('/contracts', getUploadedContracts);

export const uploadRoutes = router;
