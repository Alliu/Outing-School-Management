import { Injectable } from '@nestjs/common';
import { event, task_status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { createEventDto } from './createEventDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EvenementService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  async getEventsByUserId(id: number) {
    return this.prismaService.participant.findMany({
      select: { event: true },
      where: { participant_id: { equals: +id } },
    });
  }

  async events(userid: number): Promise<event[] | []> {
    const contacts = await this.userService.findContactIdsfromUser(userid);
    return this.prismaService.event.findMany({
      where: { organiser_id: { in: contacts } },
    });
  }

  async event(id: number): Promise<event> {
    return await this.prismaService.event.findUnique({
      include: { task: true },
      where: { id: id },
    });
  }

  async createEvent(body: createEventDto): Promise<any> {
    let taskList = [];

    if (body['task']) {
      taskList = body['task'].map((task) => ({
        title: task.title,
        description: task.description,
        status: task_status.TODO,
      }));
    }
  
    const newEvent = await this.prismaService.event.create({
      data: {
        title: body.title,
        date_start: body.date_start,
        date_end: body.date_end,
        place: body.place,
        address: body.address,
        description: body.description,
        budget: body.budget,
        detail: body.detail,
        theme: body.theme,
        askHelp: body.askHelp,
        path: body.path,
        task: taskList
          ? {
              createMany: { data: taskList },
            }
          : {},
        user_organiser: { connect: { id: body.organiser_id } },
      },
    });

    return newEvent;
  }
  async createParticipant(id: number, eventid: number) {
    return await this.prismaService.participant.create({
      data: {
        participant_id: id,
        event_id: eventid,
      },
    });
  }
  async cancelEvent(event_id: number) {
    return await this.prismaService.event.delete({ where: { id: event_id } });
  }
}
