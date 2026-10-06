import { z } from "zod";

// Romanian numbers: 07xx mobile, 02xx / 03xx landline, with or without +40.
const PHONE = /^(?:\+40|0)[237]\d{8}$/;

function digitsOnly(value) {
  return value.replace(/[\s.()-]/g, "");
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * The reservation rules, in one place. The form builds it with translated
 * messages; an API route would build it with its own and run the same checks,
 * so the browser and the server never disagree.
 */
export function createReservationSchema({ messages, slots, sizes }) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .min(2, messages.nameShort)
      .max(80, messages.nameLong),

    phone: z
      .string()
      .trim()
      .min(1, messages.phoneRequired)
      .refine((value) => PHONE.test(digitsOnly(value)), messages.phoneInvalid),

    email: z
      .string()
      .trim()
      .refine((value) => value === "" || z.email().safeParse(value).success, messages.emailInvalid),

    date: z
      .string()
      .min(1, messages.dateRequired)
      .refine((value) => !Number.isNaN(Date.parse(value)), messages.dateInvalid)
      .refine((value) => new Date(value) >= startOfToday(), messages.datePast),

    time: z.string().refine((value) => slots.includes(value), messages.timeRequired),

    guests: z
      .string()
      .refine((value) => sizes.map(String).includes(value), messages.guestsRequired),

    message: z.string().trim().max(500, messages.messageLong),
  });
}

/** Turns a failed parse into `{ fieldName: "first message" }`. */
export function fieldErrors(error) {
  const result = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field && !result[field]) {
      result[field] = issue.message;
    }
  }

  return result;
}
