import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { mokAuth_user, prismaMock } from '../../test/mock';
import { auth_user } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaMock.auth_user.findUnique.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get a user by email', () => {
    let auth_user: auth_user;
    beforeEach(() => {
      auth_user = mokAuth_user;
    });
    it('should return a user', async () => {
      prismaMock.auth_user.findUnique.mockResolvedValue(auth_user);
      const result = await service.getByEmail(auth_user.email);
      expect(result).toBe(auth_user);
      expect(prismaMock.auth_user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.auth_user.findUnique).toHaveBeenCalledWith({
        where: { email: auth_user.email },
      });
    });

    it('should return null if a user does not exist', async () => {
      prismaMock.auth_user.findUnique.mockResolvedValue(null);
      const result = await service.getByEmail(null);
      expect(result).toBe(null);
    });
  });
});
