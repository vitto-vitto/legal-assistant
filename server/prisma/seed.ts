import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create initial plans
  const freePlan = await prisma.plan.create({
    data: {
      name: 'Free',
      price: 0,
      features: {
        maxDocuments: 5,
        maxAiConsultations: 10,
        maxContracts: 2,
      },
    },
  })

  const proPlan = await prisma.plan.create({
    data: {
      name: 'Professional',
      price: 29.99,
      features: {
        maxDocuments: 50,
        maxAiConsultations: 100,
        maxContracts: 20,
        priority: true,
      },
    },
  })

  const enterprisePlan = await prisma.plan.create({
    data: {
      name: 'Enterprise',
      price: 99.99,
      features: {
        maxDocuments: -1, // unlimited
        maxAiConsultations: -1, // unlimited
        maxContracts: -1, // unlimited
        priority: true,
        customSupport: true,
      },
    },
  })

  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      planId: freePlan.id,
    },
  })

  // Create some test documents
  await prisma.document.create({
    data: {
      userId: testUser.id,
      name: 'Sample Contract.pdf',
      fileUrl: 'https://storage.example.com/sample-contract.pdf',
      type: 'CONTRACT',
      status: 'COMPLETED',
      analyzed: true,
    },
  })

  // Create a test contract
  await prisma.contract.create({
    data: {
      userId: testUser.id,
      title: 'Service Agreement',
      content: 'This is a sample service agreement contract...',
      status: 'DRAFT',
    },
  })

  // Create some AI consultations
  await prisma.aiConsultation.create({
    data: {
      userId: testUser.id,
      query: 'What are the key points to consider in a service agreement?',
      response: 'The key points to consider in a service agreement include: 1. Scope of services...',
    },
  })

  // Create some notifications
  await prisma.notification.create({
    data: {
      userId: testUser.id,
      type: 'DOCUMENT_ANALYZED',
      message: 'Your document "Sample Contract.pdf" has been analyzed',
      seen: false,
    },
  })

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
