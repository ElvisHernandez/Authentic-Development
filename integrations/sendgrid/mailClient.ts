import sgMail, { MailService } from "@sendgrid/mail";
import { getSendgridApiKey } from "src/utils/getEnvVars";

export class MailClient {
  private static instance: MailService;
  private constructor() {}

  async send({ to, subject, text }: { to: string; subject: string; text: string }) {
    return await MailClient.instance.send({
      to,
      from: "info@authenticdevelopment.net",
      subject,
      text,
    });
  }

  static getSingleton() {
    if (!this.instance) {
      sgMail.setApiKey(getSendgridApiKey());
      MailClient.instance = sgMail;
    }
    return MailClient.instance;
  }
}
