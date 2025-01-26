import { auth_user, auth_user_status } from '@prisma/client';

export const prismaMock = {
  auth_user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  token: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

export const mokAuth_user: auth_user = {
  user_id: 1,
  email: 'userEmail',
  password: '1234',
  status: auth_user_status.PENDING,
};
