import { compare, genSalt, hash } from 'bcryptjs'
import type { ICryptoService } from './interfaces/ICryptoService'

const SALT_ROUNDS = 8

class CryptoService implements ICryptoService {
  async hashPassword(password: string): Promise<string> {
    const saltGenerated = await genSalt(SALT_ROUNDS)
    return await hash(password, saltGenerated)
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash)
  }
}

export default CryptoService
