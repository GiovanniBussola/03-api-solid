import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase, CreateGymUseCaseRequest } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

const makeRequest = (): CreateGymUseCaseRequest => ({
  description: 'any_description',
  latitude: 0,
  longitude: 0,
  phone: null,
  title: 'Any title',
})

describe('CreateGym', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute(makeRequest())

    expect(gym.id).toEqual(expect.any(String))
  })

  //   it('should not be able to register with the same email twice', async () => {
  //     const email = 'johndoe@example.com'

  //     await registerUseCase.execute({
  //       name: 'John Doe',
  //       email,
  //       password: 'any_password',
  //     })

  //     await expect(() =>
  //       registerUseCase.execute({
  //         name: 'John Doe',
  //         email,
  //         password: 'any_password',
  //       }),
  //     ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  //   })
})
