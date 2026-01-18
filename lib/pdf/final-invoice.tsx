import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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

interface FinalInvoiceProps {
  invoiceNumber: string;
  variableSymbol: string;
  issueDate: string;
  taxableSupplyDate: string;
  dueDate: string;
  paymentDate?: string;
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
  paymentMethod: 'invoice' | 'qr' | 'card';
}

// Create styles (same as proforma with slight differences)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a5f7a',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  paidStamp: {
    position: 'absolute',
    top: 50,
    right: 40,
    padding: 10,
    border: '3px solid #22c55e',
    borderRadius: 5,
    transform: 'rotate(-15deg)',
  },
  paidText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  textBold: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a5f7a',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 9,
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0',
    padding: 8,
    fontSize: 9,
  },
  col1: { width: '40%' },
  col2: { width: '12%', textAlign: 'right' },
  col3: { width: '12%', textAlign: 'right' },
  col4: { width: '18%', textAlign: 'right' },
  col5: { width: '18%', textAlign: 'right' },
  summary: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '40%',
    marginBottom: 5,
  },
  summaryLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 10,
  },
  summaryValue: {
    width: '40%',
    textAlign: 'right',
    fontSize: 10,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '40%',
    marginTop: 5,
    paddingTop: 5,
    borderTop: '2px solid #1a5f7a',
  },
  summaryTotalLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    width: '40%',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a5f7a',
  },
  paymentInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 5,
    borderLeft: '4px solid #1a5f7a',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1px solid #e0e0e0',
    fontSize: 8,
    color: '#666',
  },
});

export const FinalInvoice: React.FC<FinalInvoiceProps> = ({
  invoiceNumber,
  variableSymbol,
  issueDate,
  taxableSupplyDate,
  dueDate,
  paymentDate,
  customer,
  items,
  totalWithoutVat,
  vat,
  totalWithVat,
  paymentMethod,
}) => {
  const paymentMethodLabel =
    paymentMethod === 'card' ? 'Platební kartou / Card Payment' :
    paymentMethod === 'qr' ? 'QR platbou / QR Payment' :
    'Bankovním převodem / Bank Transfer';

  const isPaid = paymentDate !== undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Paid Stamp (if paid) */}
        {isPaid && (
          <View style={styles.paidStamp}>
            <Text style={styles.paidText}>ZAPLACENO</Text>
            <Text style={styles.paidText}>PAID</Text>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>DAŇOVÝ DOKLAD - FAKTURA</Text>
          <Text style={styles.subtitle}>Tax Document - Invoice</Text>
        </View>

        {/* Supplier and Customer Info */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Dodavatel / Supplier:</Text>
            <Text style={styles.textBold}>ProjectYOU s.r.o.</Text>
            <Text style={styles.text}>Washingtonova 1599/17</Text>
            <Text style={styles.text}>110 00 Praha 1</Text>
            <Text style={styles.text}>Česká republika</Text>
            <Text style={styles.text}>IČO: 12345678</Text>
            <Text style={styles.text}>DIČ: CZ12345678</Text>
            <Text style={styles.text}>Email: info@projectyou.cz</Text>
            <Text style={styles.text}>Tel: +420 123 456 789</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Odběratel / Customer:</Text>
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
            <Text style={styles.text}>Email: {customer.email}</Text>
            <Text style={styles.text}>Tel: {customer.phone}</Text>
          </View>
        </View>

        {/* Invoice Details */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Číslo faktury / Invoice No.: <Text style={styles.textBold}>{invoiceNumber}</Text></Text>
            <Text style={styles.text}>Variabilní symbol / VS: <Text style={styles.textBold}>{variableSymbol}</Text></Text>
            <Text style={styles.text}>Způsob platby / Payment: <Text style={styles.textBold}>{paymentMethodLabel}</Text></Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Datum vystavení / Issue Date: <Text style={styles.textBold}>{issueDate}</Text></Text>
            <Text style={styles.text}>DUZP / Tax Point Date: <Text style={styles.textBold}>{taxableSupplyDate}</Text></Text>
            <Text style={styles.text}>Datum splatnosti / Due Date: <Text style={styles.textBold}>{dueDate}</Text></Text>
            {paymentDate && (
              <Text style={styles.text}>Datum zaplacení / Payment Date: <Text style={styles.textBold}>{paymentDate}</Text></Text>
            )}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Položka / Item</Text>
            <Text style={styles.col2}>Množství / Qty</Text>
            <Text style={styles.col3}>Cena/ks / Price</Text>
            <Text style={styles.col4}>Celkem / Subtotal</Text>
            <Text style={styles.col5}>Termín / Date</Text>
          </View>

          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}>
                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>{item.courseTitle}</Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{item.location}</Text>
              </View>
              <Text style={styles.col2}>{item.quantity}x</Text>
              <Text style={styles.col3}>{item.pricePerPerson.toLocaleString('cs-CZ')} Kč</Text>
              <Text style={styles.col4}>{item.totalPrice.toLocaleString('cs-CZ')} Kč</Text>
              <Text style={styles.col5}>
                {new Date(item.startDate).toLocaleDateString('cs-CZ')} - {new Date(item.endDate).toLocaleDateString('cs-CZ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Základ daně / Tax Base:</Text>
            <Text style={styles.summaryValue}>{totalWithoutVat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>DPH 21% / VAT 21%:</Text>
            <Text style={styles.summaryValue}>{vat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalLabel}>Celkem k úhradě / Total:</Text>
            <Text style={styles.summaryTotalValue}>{totalWithVat.toLocaleString('cs-CZ')} Kč</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentInfo}>
          <Text style={styles.sectionTitle}>Platební údaje / Payment Details:</Text>
          {!isPaid ? (
            <>
              <Text style={styles.text}>Číslo účtu / Account: 123456789/0100</Text>
              <Text style={styles.text}>Variabilní symbol / Variable Symbol: {variableSymbol}</Text>
              <Text style={styles.text}>IBAN: CZ65 0100 0000 0012 3456 7890</Text>
              <Text style={styles.text}>SWIFT/BIC: KOMBCZPPXXX</Text>
            </>
          ) : (
            <>
              <Text style={styles.textBold}>✓ Faktura uhrazena / Invoice Paid</Text>
              <Text style={styles.text}>Datum úhrady / Payment Date: {paymentDate}</Text>
              <Text style={styles.text}>Způsob platby / Payment Method: {paymentMethodLabel}</Text>
            </>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Tento daňový doklad je vystaven podle zákona č. 235/2004 Sb., o dani z přidané hodnoty, ve znění pozdějších předpisů.</Text>
          <Text>This tax document is issued in accordance with Act No. 235/2004 Coll., on Value Added Tax, as amended.</Text>
          <Text style={{ marginTop: 10 }}>Faktura vystavena elektronicky a je platná bez podpisu / Invoice issued electronically and is valid without signature.</Text>
        </View>
      </Page>
    </Document>
  );
};
