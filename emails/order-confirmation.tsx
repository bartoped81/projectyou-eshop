import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from '@react-email/components';

interface OrderConfirmationEmailProps {
  customerName: string;
  customerEmail: string;
  orderId: string;
  courseName: string;
  courseDate: string;
  courseTime: string;
  courseLocation: string;
  participantCount: number;
  totalAmount: number;
  paymentMethod: 'card' | 'qr';
}

export default function OrderConfirmationEmail({
  customerName,
  customerEmail,
  orderId,
  courseName,
  courseDate,
  courseTime,
  courseLocation,
  participantCount,
  totalAmount,
  paymentMethod,
}: OrderConfirmationEmailProps) {
  const paymentMethodLabel = paymentMethod === 'card' ? 'Platební kartou' : 'QR platbou';

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>GrowPORT</Heading>
            <Text style={headerSubtitle}>Potvrzení objednávky</Text>
          </Section>

          {/* Success Message */}
          <Section style={successSection}>
            <Text style={successIcon}>✅</Text>
            <Heading style={successHeading}>Děkujeme za vaši objednávku!</Heading>
            <Text style={successText}>
              Vaše registrace na kurz byla úspěšně dokončena. Těšíme se na viděnou!
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Details */}
          <Section style={section}>
            <Heading style={sectionHeading}>Detaily objednávky</Heading>

            <Row style={detailRow}>
              <Column style={detailLabel}>Číslo objednávky:</Column>
              <Column style={detailValue}>{orderId}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Jméno:</Column>
              <Column style={detailValue}>{customerName}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Email:</Column>
              <Column style={detailValue}>{customerEmail}</Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Course Details */}
          <Section style={section}>
            <Heading style={sectionHeading}>Informace o kurzu</Heading>

            <Row style={detailRow}>
              <Column style={detailLabel}>Název kurzu:</Column>
              <Column style={detailValue}>{courseName}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Datum:</Column>
              <Column style={detailValue}>{courseDate}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Čas:</Column>
              <Column style={detailValue}>{courseTime}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Místo konání:</Column>
              <Column style={detailValue}>{courseLocation}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Počet účastníků:</Column>
              <Column style={detailValue}>{participantCount}</Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Payment Details */}
          <Section style={section}>
            <Heading style={sectionHeading}>Platební informace</Heading>

            <Row style={detailRow}>
              <Column style={detailLabel}>Způsob platby:</Column>
              <Column style={detailValue}>{paymentMethodLabel}</Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailLabel}>Celková částka:</Column>
              <Column style={detailValueBold}>{totalAmount.toLocaleString('cs-CZ')} Kč</Column>
            </Row>

            <Text style={paymentNote}>
              ✓ Platba byla úspěšně přijata
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Next Steps */}
          <Section style={section}>
            <Heading style={sectionHeading}>Co dál?</Heading>
            <Text style={nextStepText}>
              📧 Další instrukce a materiály k přípravě na kurz vám zašleme několik dní před začátkem.
            </Text>
            <Text style={nextStepText}>
              📍 Nezapomeňte si poznamenat datum, čas a místo konání kurzu.
            </Text>
            <Text style={nextStepText}>
              📞 V případě jakýchkoliv dotazů nás neváhejte kontaktovat.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              S pozdravem,<br />
              Tým GrowPORT
            </Text>
            <Text style={footerContact}>
              📧 info@growport.cz<br />
              🌐 www.growport.cz
            </Text>
            <Text style={footerDisclaimer}>
              Tento email byl zaslán na adresu {customerEmail} jako potvrzení vaší objednávky.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 40px',
  backgroundColor: '#1e40af',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const headerSubtitle = {
  color: '#93c5fd',
  fontSize: '16px',
  margin: '8px 0 0 0',
  padding: '0',
};

const successSection = {
  padding: '40px 40px 20px 40px',
  textAlign: 'center' as const,
};

const successIcon = {
  fontSize: '48px',
  margin: '0 0 16px 0',
};

const successHeading = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const successText = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const section = {
  padding: '24px 40px',
};

const sectionHeading = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '500',
  width: '40%',
  paddingRight: '16px',
};

const detailValue = {
  color: '#1e293b',
  fontSize: '14px',
  fontWeight: '400',
};

const detailValueBold = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
};

const paymentNote = {
  color: '#059669',
  fontSize: '14px',
  fontWeight: '600',
  margin: '16px 0 0 0',
  padding: '12px',
  backgroundColor: '#d1fae5',
  borderRadius: '8px',
  textAlign: 'center' as const,
};

const nextStepText = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 12px 0',
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '0',
};

const footer = {
  padding: '24px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 12px 0',
};

const footerContact = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 20px 0',
};

const footerDisclaimer = {
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0',
};
