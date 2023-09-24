import sgMail from "@sendgrid/mail";
import { getSendgridApiKey } from "src/utils/getEnvVars";

export class MailClient {
  private static instance: MailClient;
  private constructor() {
    sgMail.setApiKey(getSendgridApiKey());
  }

  async send({
    to,
    subject,
    text,
    from = "info@authenticdevelopment.net",
  }: {
    to: string;
    subject: string;
    text: string;
    from?: string;
  }) {
    return await sgMail.send({
      to,
      from,
      subject,
      text,
    });
  }

  static getSingleton() {
    if (!this.instance) {
      MailClient.instance = new MailClient();
    }
    return MailClient.instance;
  }
}
