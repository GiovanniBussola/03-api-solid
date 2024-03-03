import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeRegisterUseCase(): GetUserProfileUseCase {
  const prismaUsersRepository = new PrismaUsersRepository()

  return new GetUserProfileUseCase(prismaUsersRepository)
}
