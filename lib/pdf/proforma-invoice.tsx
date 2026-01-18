import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts that support Czech characters
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

interface InvoiceItem {
  courseTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  quantity: number;
  pricePerPerson: number;
  totalPrice: number;
}

interface ProformaInvoiceProps {
  invoiceNumber: string;
  variableSymbol: string;
  issueDate: string;
  dueDate: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    isCompany: boolean;
    companyName?: string;
    ico?: string;
    dic?: string;
  };
  items: InvoiceItem[];
  totalWithoutVat: number;
  vat: number;
  totalWithVat: number;
  qrCodeDataUrl?: string;
}

// Create styles inspired by iDoklad design
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
  },
  // Header section with company info
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: '2px solid #e0e0e0',
  },
  companyInfo: {
    width: '48%',
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  invoiceTitle: {
    width: '48%',
    textAlign: 'right',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  invoiceNumberBox: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginTop: 5,
    textAlign: 'center',
  },
  invoiceNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  // Contact and customer section
  contactSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactBox: {
    width: '48%',
  },
  sectionLabel: {
    fontSize: 8,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 9,
    marginBottom: 3,
    color: '#333',
  },
  textBold: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333',
  },
  // Blue info box (like iDoklad)
  blueInfoBox: {
    backgroundColor: '#3b9dd4',
    padding: 12,
    marginBottom: 20,
    borderRadius: 3,
  },
  blueInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  blueInfoLabel: {
    fontSize: 9,
    color: '#ffffff',
    width: '55%',
  },
  blueInfoValue: {
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 'bold',
    width: '45%',
    textAlign: 'right',
  },
  blueQrCodeBox: {
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTop: '1px solid rgba(255,255,255,0.3)',
  },
  blueQrCode: {
    width: 100,
    height: 100,
  },
  blueQrLabel: {
    fontSize: 7,
    color: '#ffffff',
    marginTop: 5,
    textAlign: 'center',
  },
  // Dates row
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateBox: {
    width: '48%',
  },
  dateLabel: {
    fontSize: 8,
    color: '#666',
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333',
  },
  // Table styles
  table: {
    marginTop: 15,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 8,
    color: '#666',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0',
    padding: 8,
    fontSize: 9,
  },
  tableRowLast: {
    flexDirection: 'row',
    padding: 8,
    fontSize: 9,
  },
  col1: { width: '45%' },
  col2: { width: '12%', textAlign: 'center' },
  col3: { width: '18%', textAlign: 'right' },
  col4: { width: '25%', textAlign: 'right' },
  // Summary box
  summaryBox: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '45%',
    paddingVertical: 4,
  },
  summaryLabel: {
    width: '55%',
    textAlign: 'right',
    fontSize: 9,
    color: '#666',
  },
  summaryValue: {
    width: '45%',
    textAlign: 'right',
    fontSize: 9,
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '45%',
    backgroundColor: '#3b9dd4',
    padding: 10,
    marginTop: 5,
    borderRadius: 3,
  },
  totalLabel: {
    width: '55%',
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  totalValue: {
    width: '45%',
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // Payment section
  paymentSection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderLeft: '3px solid #3b9dd4',
  },
  paymentTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  paymentLabel: {
    width: '40%',
    fontSize: 9,
    color: '#666',
  },
  paymentValue: {
    width: '60%',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTop: '1px solid #e0e0e0',
    fontSize: 7,
    color: '#999',
  },
  footerText: {
    marginBottom: 3,
    lineHeight: 1.3,
  },
});

export const ProformaInvoice: React.FC<ProformaInvoiceProps> = ({
  invoiceNumber,
  variableSymbol,
  issueDate,
  dueDate,
  customer,
  items,
  totalWithoutVat,
  vat,
  totalWithVat,
  qrCodeDataUrl,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>ProjectYOU s.r.o.</Text>
            <Text style={styles.text}>Washingtonova 1599/17</Text>
            <Text style={styles.text}>110 00 Praha 1</Text>
            <Text style={styles.text}>Česká republika</Text>
            <Text style={styles.text}>IČO: 12345678</Text>
            <Text style={styles.text}>DIČ: CZ12345678</Text>
          </View>
          <View style={styles.invoiceTitle}>
            <Text style={styles.title}>Zálohová faktura</Text>
            <View style={styles.invoiceNumberBox}>
              <Text style={styles.invoiceNumberText}>{invoiceNumber}</Text>
            </View>
          </View>
        </View>

        {/* Contact and Customer Info */}
        <View style={styles.contactSection}>
          <View style={styles.contactBox}>
            <Text style={styles.sectionLabel}>Kontaktní údaje</Text>
            <Text style={styles.text}>E-mail: info@projectyou.cz</Text>
            <Text style={styles.text}>Telefon: +420 123 456 789</Text>
          </View>
          <View style={styles.contactBox}>
            <Text style={styles.sectionLabel}>Odběratel</Text>
            {customer.isCompany && customer.companyName ? (
              <>
                <Text style={styles.textBold}>{customer.companyName}</Text>
                {customer.ico && <Text style={styles.text}>IČO: {customer.ico}</Text>}
                {customer.dic && <Text style={styles.text}>DIČ: {customer.dic}</Text>}
              </>
            ) : (
              <Text style={styles.textBold}>{customer.name}</Text>
            )}
            <Text style={styles.text}>{customer.street}</Text>
            <Text style={styles.text}>{customer.zip} {customer.city}</Text>
            <Text style={styles.text}>E-mail: {customer.email}</Text>
            <Text style={styles.text}>Tel: {customer.phone}</Text>
          </View>
        </View>

        {/* Blue Info Box */}
        <View style={styles.blueInfoBox}>
          <View style={styles.blueInfoRow}>
            <Text style={styles.blueInfoLabel}>Bankovní účet</Text>
            <Text style={styles.blueInfoValue}>123456789/0100</Text>
          </View>
          <View style={styles.blueInfoRow}>
            <Text style={styles.blueInfoLabel}>IBAN</Text>
            <Text style={styles.blueInfoValue}>CZ65 0100 0000 0012 3456 7890</Text>
          </View>
          <View style={styles.blueInfoRow}>
            <Text style={styles.blueInfoLabel}>Variabilní symbol</Text>
            <Text style={styles.blueInfoValue}>{variableSymbol}</Text>
          </View>
          <View style={styles.blueInfoRow}>
            <Text style={styles.blueInfoLabel}>SWIFT/BIC</Text>
            <Text style={styles.blueInfoValue}>KOMBCZPPXXX</Text>
          </View>

          {/* QR Code inside blue box */}
          {qrCodeDataUrl && (
            <View style={styles.blueQrCodeBox}>
              <Image src={qrCodeDataUrl} style={styles.blueQrCode} />
              <Text style={styles.blueQrLabel}>Naskenujte pro platbu</Text>
            </View>
          )}
        </View>

        {/* Dates */}
        <View style={styles.datesRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Datum vystavení:</Text>
            <Text style={styles.dateValue}>{issueDate}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Datum splatnosti:</Text>
            <Text style={styles.dateValue}>{dueDate}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Položka</Text>
            <Text style={styles.col2}>Množství</Text>
            <Text style={styles.col3}>Cena/ks</Text>
            <Text style={styles.col4}>Celkem bez DPH</Text>
          </View>

          {items.map((item, index) => (
            <View key={index} style={index === items.length - 1 ? styles.tableRowLast : styles.tableRow}>
              <View style={styles.col1}>
                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>{item.courseTitle}</Text>
                <Text style={{ fontSize: 8, color: '#666', marginBottom: 1 }}>
                  {new Date(item.startDate).toLocaleDateString('cs-CZ')} - {new Date(item.endDate).toLocaleDateString('cs-CZ')}
                </Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{item.location}</Text>
              </View>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{item.pricePerPerson.toLocaleString('cs-CZ')} Kč</Text>
              <Text style={styles.col4}>{item.totalPrice.toLocaleString('cs-CZ')} Kč</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Základ daně:</Text>
            <Text style={styles.summaryValue}>{totalWithoutVat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>DPH 21%:</Text>
            <Text style={styles.summaryValue}>{vat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Celkem k úhradě:</Text>
            <Text style={styles.totalValue}>{totalWithVat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
        </View>

        {/* Payment Instructions */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Platební instrukce</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Částka k úhradě:</Text>
            <Text style={styles.paymentValue}>{totalWithVat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Variabilní symbol:</Text>
            <Text style={styles.paymentValue}>{variableSymbol}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Splatnost:</Text>
            <Text style={styles.paymentValue}>{dueDate}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Toto je zálohová faktura vystavená podle § 13 odst. 2 zákona č. 235/2004 Sb., o dani z přidané hodnoty.
          </Text>
          <Text style={styles.footerText}>
            Faktura vystavena elektronicky a je platná bez podpisu a razítka.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
