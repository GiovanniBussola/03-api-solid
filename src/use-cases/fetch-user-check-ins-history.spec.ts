import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let sut: FetchUserCheckInsHistoryUseCase
let checkInsRepository: InMemoryCheckInsRepository

describe('FetchUserCheckInHistoryUseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })

    await checkInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'other user',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_01' }),
      expect.objectContaining({ gym_id: 'gym_02' }),
    ])
  })

  it('should be able to fetch paginated check-in repository', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
