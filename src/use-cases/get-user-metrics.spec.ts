import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let sut: GetUserMetricsUseCase
let checkInsRepository: InMemoryCheckInsRepository

describe('FetchUserCheckInHistoryUseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-in count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
