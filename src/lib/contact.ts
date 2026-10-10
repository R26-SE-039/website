import { site } from "@/data/site";
import { team } from "@/data/team";

/** Group inbox once it exists; until then the four member addresses. */
export const contactRecipients: string = site.contactEmail.startsWith("TODO")
  ? team.map((m) => m.email).join(",")
  : site.contactEmail;

/** mailto: link pre-filled with the general e-mail template (course requirement §8.7). */
export const mailtoHref = `mailto:${contactRecipients}?subject=${encodeURIComponent(
  site.emailTemplate.subject,
)}&body=${encodeURIComponent(site.emailTemplate.body)}`;
