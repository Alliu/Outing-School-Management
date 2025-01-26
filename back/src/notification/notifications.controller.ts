import { Body, Controller, Post, Query, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Observable, Subject, map } from 'rxjs';
import {
  NotificationData,
  createNotificationDto,
} from './createNotificationDto';

@Controller('notifications')
export class NotificationsController {
  private notification$ = new Subject<NotificationData>();
  constructor(private readonly notificationService: NotificationService) {}

  @Sse('event')
  async sendEvents(@Query() query: any): Promise<Observable<NotificationData>> {
    const last = await this.notificationService.findlasEventtNotification(
      +query.id,
    );

    return this.notification$.asObservable().pipe(
      map((event) => ({
        data: {
          userId: last.user_id,
          eventId: last.notification.event_id,
          message: last.notification.message,
          contactId: last.notification.contact_id,
          mediaId: last.notification.media_id,
        },
      })),
    );
  }

  @Post()
  async sendNotification(@Body() body: createNotificationDto) {
    await this.notificationService.createEventNotification(body);
    const notificationData: NotificationData = {
      data: {
        ...body,
      },
    };
    this.notification$.next(notificationData);
    return { success: true, message: 'Événement déclenché' };
  }

  @Post('read')
  async readNotif(@Body() body: { userid: string; notifid: string }) {
    return this.notificationService.markAsRead(+body.userid, +body.notifid);
  }
}
