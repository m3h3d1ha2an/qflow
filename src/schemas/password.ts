import { z } from "zod";

const PASSWORD_RULES = {
  LENGTH: {
    MINIMUM: 8,
    MAXIMUM: 100,
  },
  REGEX: {
    SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
    LOWERCASE: /[a-z]/,
    UPPERCASE: /[A-Z]/,
    NUMBER: /[0-9]/,
  },
  MESSAGE: {
    MINIMUM: `Password must be at least 8 characters long`,
    MAXIMUM: `Password must be at most 100 characters long`,
    LOWERCASE: "Password must contain at least one lowercase letter",
    UPPERCASE: "Password must contain at least one uppercase letter",
    NUMBER: "Password must contain at least one number",
    SPECIAL: "Password must contain at least one special character",
  },
};

export const passwordSchema = z
  .string()
  .min(PASSWORD_RULES.LENGTH.MINIMUM, PASSWORD_RULES.MESSAGE.MINIMUM)
  .max(PASSWORD_RULES.LENGTH.MAXIMUM, PASSWORD_RULES.MESSAGE.MAXIMUM)
  .regex(PASSWORD_RULES.REGEX.LOWERCASE, PASSWORD_RULES.MESSAGE.LOWERCASE)
  .regex(PASSWORD_RULES.REGEX.UPPERCASE, PASSWORD_RULES.MESSAGE.UPPERCASE)
  .regex(PASSWORD_RULES.REGEX.NUMBER, PASSWORD_RULES.MESSAGE.NUMBER)
  .regex(PASSWORD_RULES.REGEX.SPECIAL, PASSWORD_RULES.MESSAGE.SPECIAL);
