import { Injectable } from '@nestjs/common';
import { notif_type } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { createNotificationDto } from './createNotificationDto';

@Injectable()
export class NotificationService {
  // private notifications$ = new Subject<{ data: string }>();
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createEventNotification(
    body: createNotificationDto,
    // contactList: number[],
  ) {
    const contactList = await this.userService.findContactIdsfromUser(
      body.userId,
    );
    await this.prismaService.notification.create({
      data: {
        type: notif_type.EVENT,
        message: body.message,
        event_id: body.eventId,
        event: { connect: { id: body.eventId } },
        user: {
          create: contactList.map((contact: number) => ({
            user_id: contact,
          })),
        },
      },
    });
  }

  // Récupérer les notifications d'un utilisateur
  async notifications(userId: number): Promise<any> {
    return await this.prismaService.user_notification.findMany({
      select: { notification: true },
      where: { user_id: userId, isRead: false },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
  async markAsRead(notificationId: number, userId: number): Promise<any> {
    await this.prismaService.user_notification.update({
      where: {
        user_id_notification_id: {
          notification_id: notificationId,
          user_id: userId,
        },
      },
      data: { isRead: true },
    });
    return { notificationId, userId };
  }

  async findlasEventtNotification(id: number) {
    return this.prismaService.user_notification.findFirst({
      where: { user_id: { equals: id } },
      orderBy: { created_at: { sort: 'desc' } },
      select: { notification: true, user_id: true },
    });
  }
}
