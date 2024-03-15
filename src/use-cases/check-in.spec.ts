import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let sut: CheckInUseCase
let checkinsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository

describe('CheckInsUseCase', () => {
  const makeRequest = ({ userLatitude = 0, userLongitude = 0 }) => ({
    gymId: 'gym-01',
    userId: 'user-01',
    userLatitude,
    userLongitude,
  })

  beforeEach(() => {
    vi.useFakeTimers()

    checkinsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()

    gymsRepository.items.push({
      id: 'gym-01',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
      title: 'Any Academy',
    })

    sut = new CheckInUseCase(checkinsRepository, gymsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute(makeRequest({}))

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute(makeRequest({}))

    await expect(sut.execute(makeRequest({}))).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute(makeRequest({}))

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute(makeRequest({}))

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym ', async () => {
    gymsRepository.items.push({
      id: 'gym-01',
      description: '',
      latitude: new Decimal(-23.3801301),
      longitude: new Decimal(-53.2851249),
      phone: '',
      title: 'Any Academy',
    })

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await expect(
      sut.execute(
        makeRequest({
          userLatitude: -24.0,
          userLongitude: -53.0,
        }),
      ),
    ).rejects.toBeInstanceOf(Error)
  })
})
