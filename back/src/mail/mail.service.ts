import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
  ContactsApi,
  ContactsApiApiKeys,
} from '@getbrevo/brevo';

@Injectable()
export class MailService {
  private brevoClient: TransactionalEmailsApi;
  private brevoContacts: ContactsApi;
  private sendSmtpEmail: SendSmtpEmail;
  constructor() {}

  async createContact(email: string, firstname: string) {
    this.brevoContacts = new ContactsApi();
    this.brevoContacts.setApiKey(
      ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY,
    );
    this.brevoContacts.createContact(
      { email: email, attributes: { nom: firstname } },
      {
        headers: {
          apiKey: 'apiKey',
        },
      },
    );
  }
  async getContact() {
    this.brevoContacts = new ContactsApi();
    this.brevoContacts.setApiKey(
      ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY,
    );
    this.brevoContacts.getContacts();
  }

  async sendEmail(
    to: Array<{ email: string; name: string }>,
    subject: string,
    templateId: number,
    params?: { [key: string]: string },
  ) {
    const apiKeyEnv = process.env.BREVO_API_KEY;
    if (!apiKeyEnv) {
      throw new Error('BREVO_API_KEY is not set');
    }
  
    this.brevoClient = new TransactionalEmailsApi();
    this.brevoClient.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKeyEnv);
    // console.log('brovo', this.brevoClient);

    // console.log((await this.brevoClient.getSmtpTemplate(1)).body.htmlContent);

    this.sendSmtpEmail = new SendSmtpEmail();

    this.sendSmtpEmail = {
      sender: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME,
      },
      to: to,
      subject: subject,
      htmlContent: (await this.brevoClient.getSmtpTemplate(templateId)).body
        .htmlContent,
      params: params,
    };

    try {
      const response = await this.brevoClient.sendTransacEmail(
        this.sendSmtpEmail,
      );

      console.log('Email sent successfully:', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error;
    }
  }
}
