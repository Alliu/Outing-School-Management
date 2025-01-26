import { $Enums } from '@prisma/client';
import { Task } from './createEventDto';

export interface EventDetailInterface {
  id: number;
  title: string;
  theme: $Enums.theme;
  date_start: Date;
  date_end: Date;
  place: string;
  budget: number;
  description: string;
  detail: string;
  askHelp: boolean;
  tasks: Task[];
  path?: string | null;
}
