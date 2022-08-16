import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface ContextInterface {
    prisma: PrismaClient
}

export const prismaContext: ContextInterface = {
    prisma: prisma
}