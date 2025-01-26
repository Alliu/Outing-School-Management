import { Injectable } from '@nestjs/common';
import {
  $Enums,
  auth_user,
  auth_user_status,
  Prisma,
  teacher_school,
  token,
  token_type,
  user_profile_role,
} from '@prisma/client';

//const bcrypt = require('bcrypt');
import { UserService } from 'src/user/user.service';
import { CreateUserProfDto } from './dtos/prof/createUserProf.dto';
//import * as bcrypt from 'bcrypt';
import { CreateUserParentDto } from './dtos/parent/createUserParent.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getByEmail(email: string): Promise<auth_user | null> {
    return this.prismaService.auth_user.findUnique({
      where: { email },
    });
  }

  async createWithProfileTeacher(
    body: CreateUserProfDto,
    school_email: string,
  ): Promise<auth_user> {
    return this.prismaService.auth_user.create({
      data: {
        email: body.teacher_email,
        password: body.password,
        status: auth_user_status.PENDING,
        user_profile: {
          create: {
            firstname: body.firstname,
            lastname: body.lastname,
            role: user_profile_role.TEACHER,
            teacher_school: {
              create: { school: { create: { email: school_email } } },
            },
          },
        },
      },
    });
  }

  async createToken(
    user_id: number,
    token: string,
    type: token_type,
    expired_at: Date,
  ): Promise<token> {
    return this.prismaService.token.create({
      data: {
        user_profile: {
          connect: {
            id: user_id,
          },
        },
        token,
        type,
        expired_at,
      },
    });
  }
  async getByToken(token: string): Promise<token> {
    return this.prismaService.token.findFirst({
      where: { token: token },
    });
  }

  async createWithProfileParent(body: CreateUserParentDto): Promise<auth_user> {
    return this.prismaService.auth_user.create({
      data: {
        email: body.email,
        status: $Enums.auth_user_status.PENDING,
        password: body.password,
        user_profile: {
          create: {
            firstname: body.firstname,
            lastname: body.lastname,
            role: $Enums.user_profile_role.PARENT,
          },
        },
      },
    });
  }

  async getUserToken(id: number): Promise<token> {
    return this.prismaService.token.findFirst({
      where: { user_id: id },
    });
  }

  async updateStatus(params: {
    where: Prisma.auth_userWhereUniqueInput;
    data: Prisma.auth_userUpdateInput;
  }) {
    return await this.prismaService.auth_user.update(params);
  }

  async updateToken(params: {
    where: Prisma.tokenWhereUniqueInput;
    data: Prisma.tokenUpdateInput;
  }) {
    return await this.prismaService.token.update(params);
  }

  async getById(id: number): Promise<auth_user | null> {
    return this.prismaService.auth_user.findUnique({
      where: { user_id: id },
    });
  }
  async getEmailById(id: number): Promise<auth_user | null> {
    return this.prismaService.auth_user.findUnique({
      where: { user_id: id },
    });
  }

  // hasher le password
  async bhash(password: string): Promise<string> {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hashSync(password, await salt);
  }
  // comparer password à pw hashé..
  async bcompare(
    secretText: string,
    hashed_secretText: string,
  ): Promise<boolean> {
    return bcrypt.compare(secretText, hashed_secretText);
  }
  async getTokenCookie(name: string, cookieHeader: string): Promise<string> {
    const match = cookieHeader.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  async verifyToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_REFRESH_KEY,
    });
    return payload;
  }

  async compareToken(id: number, token: string) {
    const userToken = await this.getUserToken(id);
    // console.log(userToken);

    const compareToken = await this.bcompare(token, userToken.token);
    console.log(compareToken);

    return compareToken;
  }
  async setCookie(res: Response, tokens: { [key: string]: string }) {
    const isProduction = process.env.NODE_ENV === 'production';
    for (const key in tokens) {
      // console.log(`${key}`, tokens[key]);
      res.cookie(`${key}`, tokens[key], {
        httpOnly: true, // Empêche l'accès via JavaScript côté client
        secure: isProduction, // Assure l'utilisation du HTTPS
        sameSite: isProduction ? 'none' : 'lax', //Protége contre les requêtes cross-site
        maxAge: 1000 * 60 * 60 * 24, // Temps de validité (en millisecondes)
        domain: process.env.DOMAIN,
      });
    }
  }
  async deleteProfile(user_id: number) {
    await this.prismaService.token.delete({ where: { user_id: user_id } });
    return await this.prismaService.auth_user.delete({
      where: { user_id: user_id },
      include: {
        user_profile: true,
      },
    });
  }
}
