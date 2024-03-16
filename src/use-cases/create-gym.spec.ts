import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase, CreateGymUseCaseRequest } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

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
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute(makeRequest())

    expect(gym.id).toEqual(expect.any(String))
  })
})
