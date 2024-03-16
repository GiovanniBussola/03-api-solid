import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    return gym ?? null
  }

  async create({
    id,
    latitude,
    longitude,
    title,
    description,
    phone,
  }: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: id ?? randomUUID(),
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      title,
      description: description ?? null,
      phone: phone ?? null,
    }

    this.items.push(gym)

    return gym
  }
}
