import { UserService } from './user.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { message, user_profile } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EvenementService } from 'src/evenement/evenement.service';
import { MessageService } from 'src/message/message.service';
import { NotificationService } from 'src/notification/notification.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly eventService: EvenementService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get('profile')
  async contactProfile(@Query('contactid') id: string): Promise<user_profile> {
    return await this.userService.getUserById(+id);
  }
  @Get('contact')
  async contacts(@Query('userid') id: string) {
    const userContacts = await this.userService.findUserContacts(+id);

    const teachers = await userContacts.filter(
      (contact) => contact.role === 'TEACHER',
    );
    const parents = await userContacts.filter(
      (contact) => contact.role === 'PARENT',
    );

    return { teachers, parents };
  }

  @Get('messages')
  async getMessages(
    @Query('userid') userid: string,
    @Query('contactid') contactid: string,
  ): Promise<message[]> {
    return this.messageService.userMessages(+userid, +contactid);
  }

  @Get('event')
  async getUserEvents(@Query('userid') id: string) {
    return await this.eventService.getEventsByUserId(+id);
  }

  @Get('notifications')
  async getsNotifications(@Query('userid') id: string) {
    return await this.notificationService.notifications(+id);
  }
}
