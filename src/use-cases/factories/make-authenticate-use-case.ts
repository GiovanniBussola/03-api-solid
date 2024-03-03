import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const prismaUsersRepository = new PrismaUsersRepository()

  return new AuthenticateUseCase(prismaUsersRepository)
}
