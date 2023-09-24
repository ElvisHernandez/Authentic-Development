import { resolver } from "@blitzjs/rpc";
import db from "db";
import { MailClient } from "integrations/sendgrid/mailClient";
import { z } from "zod";

const CreateInquirySchema = z.object({
  name: z.string(),
  email: z.string(),
  inquiryDetails: z.string(),
  projectType: z.string(),
});

export default resolver.pipe(resolver.zod(CreateInquirySchema), async (inquiry) => {
  const mailClient = MailClient.getSingleton();

  await db.inquiry.create({ data: inquiry });
  await mailClient.send({
    to: "elvis@authenticdevelopment.net",
    subject: "New Client Inquiry",
    text: `New inquiry from potential client - (${inquiry.name} - ${inquiry.email})
        
            Project type: ${inquiry.projectType}
            Project details: ${inquiry.inquiryDetails}
        `,
  });
});
