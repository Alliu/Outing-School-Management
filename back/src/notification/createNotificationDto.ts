export class createNotificationDto {
  userId: number;
  mediaId?: number;
  eventId?: number;
  contactId?: number;
  message: string;
}

export interface NotificationData {
  data: {
    userId: number;
    eventId?: number;
    contactId?: number;
    mediaId?: number;
    message: string;
  };
}
