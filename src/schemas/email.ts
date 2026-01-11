import z from "zod";

const EMAIL_RULES = {
  REGEX: {
    RFC5322: z.regexes.rfc5322Email,
    BLOCKED: /^[^@]*@(?!blocked\.com$|.*\.blocked\.com$).*$/i,
  },
  LENGTH: {
    MINIMUM: 2,
    MAXIMUM: 100,
  },
  MESSAGE: {
    MINIMUM: "Email must be at least 2 characters long",
    MAXIMUM: "Email must be at most 100 characters long",
    INVALID: "Enter a valid email address",
    BLOCKED: "This domain is not allowed",
  },
};

export const emailSchema = z.string().check(
  // 1. Formatting
  z.trim(),

  // 2. Length Constraints with Custom Messages
  z.minLength(EMAIL_RULES.LENGTH.MINIMUM, EMAIL_RULES.MESSAGE.MINIMUM),
  z.maxLength(EMAIL_RULES.LENGTH.MAXIMUM, EMAIL_RULES.MESSAGE.MAXIMUM),

  // 3. Email Validation (using the HTML5 web standard regex)
  z.email({
    pattern: EMAIL_RULES.REGEX.RFC5322,
    error: EMAIL_RULES.MESSAGE.INVALID,
  }),

  // 4. Custom Regex (e.g., forbidding specific domains)
  z.regex(EMAIL_RULES.REGEX.BLOCKED, EMAIL_RULES.MESSAGE.BLOCKED),

  // 5. Final Transformation
  z.toLowerCase(),
);
