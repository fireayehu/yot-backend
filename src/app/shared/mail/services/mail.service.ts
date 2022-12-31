import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as path from 'path';
import * as ejs from 'ejs';
import * as htmlToText from 'html-to-text';
import { IPasswordEmail } from '../interfaces/password-email.interface';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(
      this.configService.get<string>('SEND_GRID_KEY') as string,
    );
  }

  private async send(mail: SendGrid.MailDataRequired) {
    await SendGrid.send(mail);
  }

  async sendPasswordEmail(email: IPasswordEmail) {
    try {
      const html = await ejs.renderFile(
        path.join(__dirname, '../templates/password.ejs'),
        {
          fullName: email.name,
          password: email.password,
          link: email.link,
        },
      );

      const mail: SendGrid.MailDataRequired = {
        to: email.to,
        from: this.configService.get<string>('SENDER_EMAIL') as string,
        subject: 'Welcome to YOT Technology',
        text: htmlToText.convert(html),
        html: html,
      };
      await this.send(mail);
    } catch (err) {
      Logger.error(err);
    }
  }
}
