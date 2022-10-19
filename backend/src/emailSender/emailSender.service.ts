import { createTransport } from 'nodemailer';
import configs from '../config/configuration';

// async..await is not allowed in global scope, must use a wrapper
export class EmailSender {
  async sendEmail(mails: string[], message: string) {
    const transporter = createTransport({
      host: configs().smtpConfig.host,
      port: configs().smtpConfig.port,
      secure: false,
      auth: {
        user: configs().smtpConfig.user,
        pass: configs().smtpConfig.pass,
      },
    });
    await transporter.sendMail({
      from: 'testservex@yandex.ru', // sender address
      to: `${mails.join(', ')}`, // list of receivers
      subject: 'Деньги на подарок', // Subject line
      text: `${message}`, // plain text body
      html: `<div>
      <h3>Люди которые готовы скинутся на подарок</h3>
      <p> ${mails.join(', <br>')}</p>
      </div>`, // html body
    });
  }
}
