import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  pretty,
  render,
  Section,
  Tailwind,
  Text,
  toPlainText,
} from "@react-email/components";

const WelcomeMessage = ({ name }: { name: string }) => (
  <Html lang="en" dir="ltr">
    <Tailwind>
      <Head />
      <Preview>Welcome to QFlow !</Preview>
      <Body className="bg-white font-sans py-[40px]">
        <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
          {/* Heading */}
          <Section className="mb-[24px]">
            <Heading className="text-[28px] font-bold text-gray-900 m-0">Welcome to QFlow ! 🎉</Heading>
          </Section>

          {/* Greeting */}
          <Section className="mb-[16px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
          </Section>

          {/* Thank you message */}
          <Section className="mb-[24px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Thank you for signing up with QFlow! We're absolutely thrilled to have you join our growing community.
            </Text>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px] mt-[16px]">
              Your account has been successfully created and you're now part of a platform designed to appointment
              management simple, secure, and reliable. We're committed to providing you with the best possible
              experience as you explore everything QFlow has to offer.
            </Text>
          </Section>

          {/* Closing */}
          <Section>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Best Regards,
              <br />
              QFlow Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeMessage.PreviewProps = {
  name: "John Doe",
};

export const welcomeMessageHtml = async (name: string) => await pretty(await render(<WelcomeMessage name={name} />));
export const welcomeMessageText = async (name: string) => toPlainText(await welcomeMessageHtml(name));
