import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import { UsersRepository } from '@/repositories/users-repository'

let registerUseCase: RegisterUseCase
let usersRepository: UsersRepository

describe('RegisterUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'any_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'any_password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'any_password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'any_password',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
