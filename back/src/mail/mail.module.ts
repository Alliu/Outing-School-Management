import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
//import { SendSmtpEmail, TransactionalEmailsApi } from '@getbrevo/brevo'; // ou votre bibliothèque de gestion des mails
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
