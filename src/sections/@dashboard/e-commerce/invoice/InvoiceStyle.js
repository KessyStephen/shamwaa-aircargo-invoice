import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const styles = StyleSheet.create({
  bg: { backgroundColor: "rgba(232, 236, 241, 1)", padding: 3 },
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  mb80: { marginBottom: 80 },
  bb:{ borderBottomWidth: 1 },
  rtl: {direction: 'rtl'},
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  h4: { fontSize: 11, fontWeight: 600 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 50px 0 50px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '15%' },
  tableCell_2: { width: '45%', paddingRight: 16 },
  tableCell_3: { width: '15%' },
});

export default styles;
