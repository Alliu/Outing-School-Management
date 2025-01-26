import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  media_type,
  message,
  Prisma,
  user_contact,
  user_profile,
} from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { write } from 'fs';
import { Socket } from 'socket.io';
import { every } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(id: number): Promise<user_profile | null> {
    const user = await this.prismaService.user_profile.findUnique({
      include: {
        media: {
          where: { type: media_type.USER_PROFILE_ID },
          select: { path: true },
        },
      },
      where: { id: id },
    });
    return user;
  }

  async findUserById(id) {
    const user = await this.prismaService.user_profile.findUnique({
      where: { id: id },
    });
    if (!user) return false;
    return user;
  }

  async findUserContacts(id: number): Promise<any> {
    const userContacts_contactUsers = this.prismaService.user_contact.findMany({
      where: {
        OR: [{ user_id: id }, { contact_id: id }],
      },
      select: {
        user_id: true,
        contact_id: true,
      },
    });
    const userContacts = (await userContacts_contactUsers)
      .map((contact) => contact.contact_id)
      .filter((user) => user !== id);
    const contactUsers = (await userContacts_contactUsers)
      .map((contact) => contact.user_id)
      .filter((user) => user !== id);
    const allContacts = userContacts.concat(contactUsers);
    return this.prismaService.user_profile.findMany({
      where: { id: { in: allContacts } },
      select: {
        id: true,
        role: true,
        firstname: true,
        lastname: true,
        teacher_school: {
          include: {
            school: { select: { name: true } },
          },
        },
      },
    });
  }

  async findContactIdsfromUser(id: number): Promise<number[]> {
    const userContacts_contactUsers = this.prismaService.user_contact.findMany({
      where: {
        OR: [{ user_id: id }, { contact_id: id }],
      },
      select: {
        user_id: true,
        contact_id: true,
      },
    });
    const userContacts = (await userContacts_contactUsers)
      .map((contact) => contact.contact_id)
      .filter((user) => user !== id);
    const contactUsers = (await userContacts_contactUsers)
      .map((contact) => contact.user_id)
      .filter((user) => user !== id);
    return userContacts.concat(contactUsers);
  }

  async updateSocket(id: number, socket: string) {
    return this.prismaService.user_profile.update({
      where: { id: id },
      data: { socket: socket },
    });
  }
  async getUserSocket(id: number): Promise<user_profile | null> {
    return this.prismaService.user_profile.findUnique({
      where: { id: id },
    });
  }

  async deleteSocket(id: number, socket: string) {
    return this.prismaService.user_profile.update({
      where: { id: id, socket: socket },
      data: { socket: null },
    });
  }
}
