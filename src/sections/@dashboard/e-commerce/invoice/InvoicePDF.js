/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoicePDF({invoice, batchNumber}) {
  const { clientName, phoneNumber, amountUSD, amountTZS, data, date } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image 
            src="/logo/shamwaa-logo-black2.png" 
            style={{ height: 50 }} 
          />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{date}</Text>
            <Text>{batchNumber}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col8}>
            <Text style={[styles.overline, styles.mb8]}>BILL TO.</Text>
            <Text style={styles.body1}>{clientName}</Text>
            <Text style={styles.body1}>Dar-es-Salaam, Tanzania</Text>
            <Text style={styles.body1}>Phone: {phoneNumber}</Text>
          </View>
          <View style={styles.col4}>
            <Text style={[styles.overline, styles.mb8, styles.rtl]}>PAY TO.</Text>
            <Text style={styles.body1}>Shamwaa Aircargo Services</Text>
            <Text style={styles.body1}>Victoria Place Building</Text>
            <Text style={styles.body1}>Dar-es-Salaam, Tanzania</Text>
            <Text style={styles.body1}>Phone: +255 659 900 000</Text>
            <Text style={styles.body1}>E-mail: shamwaatz@gmail.com</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={[styles.tableHeader, styles.bg]}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#Item No.</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Item</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Unit price</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {data.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text>{item.trackNumber}</Text>
                </View>
                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.title}</Text>
                  <Text>{item.particulars}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.weight}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{item.unitPrice}</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(item.totalAmountUSD)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(amountUSD)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
                <View style={[styles.tableCell_3, styles.bb]}>
                  <Text>Taxes</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight, styles.bb]}>
                  <Text>{fCurrency(0)}</Text>
                </View>
              
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h5}>Total(USD)</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h5}>$ {fCurrency(amountUSD)}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h5}>Total(TZS)</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight, styles.mb8]}>
                <Text style={styles.h5}>TZS {fCurrency(amountTZS)}</Text>
              </View>
            </View>
          </View>
        </View>

        
          <View style={[styles.col8, styles.mb40]}>
            <Text style={styles.subtitle2}>BANK ACCOUNT INFORMATION:</Text>
            <Text>Beneficiary Bank Name: NMB BANK PLC</Text>
            <Text>Branch: MANDELA ROAD</Text>
            <Text>Swift code:   NMBIBTZTZ</Text>
            <Text>Account Name: SHAMWA TRADING</Text>
            <Text>Account No: 23810030077  (TZS)</Text>
            <Text>Account Name: SHAMWA TRADING</Text>
          </View>

        
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>TERMS AND CONDITIONS</Text>
            <Text>1.	This Invoice must be paid within 24 hours. All goods that are not paid for will not be dispatched from the warehouse on the agreed date or flight.</Text>
            <Text>2.	SHAMWAA will not be responsible for any delayed goods as a result of failure to complete invoice payment on time</Text>
            <Text>3.	All payment receipts should be presented to the company for confirmation. Payment made without office confirmation will be considered unreceived and the respective goods unpaid for.</Text>
            <Text>4.	Invoice price includes all charges (shipping + customs + clearance)</Text>
            <Text>5.	After all payments are made, shipping to Tanzania will take five to twelve days, depending on the nature of goods. This duration does not include customs clearance time.</Text>
            <Text>6.	Any complaints in respect to this invoice should be raised to the company within 24 hours of issue. The company is not obligated to make any amendments to the invoice after the 24-hour period unless it seems right based on company policies, procedures and accounting regulations.</Text>
            <Text>7.	Time periods stated in this invoice are close estimates and are may vary in accordance with the respective flight company.Incase of cargo delay,the company will employ all its resources to deal with such delay but it is not obligated to refund the customer nor offer any kind of discount
</Text>
            <Text>According to IATA volume weight 1CBM = 167kgs.chargable weight should be based on gross weight or volume weight whichever is higher</Text>
            <Text>9.  A customer should insure cargo if in high value.
              Otherwise claims payable will be inaccordance with IATA international practice,
              The maximum is us $20.00 per kg of damaged item.
              NOTE: When customer make payment it means he/she accept the terms and condition of the company.</Text>
          </View>

          <View style={[styles.col8, styles.mb8]}>
              <Text>All payments must be made to the company Bank account</Text>
          </View>

          <View style={[styles.col8, styles.mb8]}>
              <Text>REFUND POLCY; We hope you will be pleased with your purchase. Should you wish to return anything bought or transported by us, we will be happy to refund or exchange the product provided that it is for a valid reason and after review by the company policies. Refunds will be made 14 days after refund request has been accepted. Refunds will not be made on basis of cargo delay.
              Incase of any loss.…. refunds will be in kilograms according to the courier rules and regulations</Text>
          </View>
          

          
      </Page>
    </Document>
  );
}
