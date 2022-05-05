import nodemailer from 'nodemailer';
import { IMailAdapter, IMailAdapterData } from "../mailAdapter.interface";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "38423048eaa1e1",
    pass: "902bbbc301e40c"
  }
});

export class MailAdapter implements IMailAdapter {
  async send({ body, subject }: IMailAdapterData): Promise<void> {

    await transport.sendMail({
      from: '"Equipe feedbacks 👻" <oi@feedget.com>',
      to: 'Diego <diego@gmail.com>',
      subject,
      html: [
        `<h1>Feedbacks</h1>`,
        `<p>${body}</p>`
      ].join('\n'),
    })
  }
}