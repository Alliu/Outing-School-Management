import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { EvenementService } from './evenement.service';
import { EventDetailInterface } from './eventInterface';
import { createEventDto } from './createEventDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('event')
@UseGuards(AuthGuard)
export class EvenementController {
  constructor(private events: EvenementService) {}

  @Get()
  async getContactEvents(@Query('userid') id: string) {
    return this.events.events(+id);
  }

  @Get('detail')
  async getEventDetail(@Query('id') id: string): Promise<EventDetailInterface> {
    const event = await this.events.event(+id);
    return {
      id: event.id,
      title: event.title,
      theme: event.theme,
      date_start: event.date_start,
      date_end: event.date_end,
      place: event.place,
      budget: event.budget,
      description: event.description,
      detail: event.description,
      askHelp: event.askHelp,
      tasks: event['tasks']
        ? event['tasks'].map((task) => task.title + ' : ' + task.status)
        : 'aucune tâche',
      path: event.path,
    };
  }

  @Post()
  async addEvent(@Body() body: createEventDto) {
    console.log('body', body);
    return await this.events.createEvent(body);
  }

  @Delete()
  async deleteEvent(@Query('id') id: string) {
    return await this.events.cancelEvent(+id);
  }

  @Post('participant')
  async addParticipant(
    @Query('userid') id: string,
    @Query('eventid') eventid: string,
  ) {
    return await this.events.createParticipant(+id, +eventid);
  }
}
