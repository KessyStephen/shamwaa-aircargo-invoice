// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router'

import { PATH_PAGE } from '../routes/paths';
// utils
import { fCurrency } from '../utils/formatNumber';

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Image from '../components/Image';
import Scrollbar from '../components/Scrollbar';

import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { InvoiceToolbar } from '../sections/@dashboard/e-commerce/invoice';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceInvoice() {
  const __invoice = useSelector(state => state.invoice.value);
  const batchNumber = useSelector(state => state.invoice.batchNumber);
  const { themeStretch } = useSettings();
  const router = useRouter();

  
    if(Object.keys(__invoice).length === 0){
      return <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", height:'100vh', justifyContent:"center"}}>
                <Button
                  variant="contained"
                  to="#"
                  startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}
                  onClick={() => router.push('/')}
                >
                  Go To Home
                </Button>
            </Box>
    }

      return (
        <Page title="Shamwaa: Invoice">
          <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
              heading="Invoice Details"
              links={[
                {
                  name: 'Users',
                  href: PATH_PAGE.userList,
                },
                { name: 'Invoice' },
              ]}
            />

            <InvoiceToolbar invoice={__invoice} batchNumber={batchNumber} />

            <Card sx={{ pt: 5, px: 5 }}>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                  <Image 
                    disabledEffect 
                    visibleByDefault 
                    alt="logo" 
                    src="https://firebasestorage.googleapis.com/v0/b/shamwaa-website.appspot.com/o/shamwaa-logo-black2.png?alt=media&token=97e25d47-0013-4020-910f-a5ed714b3ff9" 
                    sx={{ maxWidth: 200 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                  <Box sx={{ textAlign: { sm: 'right' } }}>
                    <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                      invoice
                    </Label>
                    <Typography variant="h6">{batchNumber}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={6} sx={{ mb: 5 }}>
                  <Typography paragraph variant="overline" sx={{ fontSize: 15 }}>
                    Invoice To:
                  </Typography>
                  <Typography variant="body2">{__invoice.clientName}</Typography>
                  <Typography variant="body2">Dar-es-Salaam, Tanzania</Typography>
                  <Typography variant="body2">Phone: {__invoice.phoneNumber}</Typography>
                </Grid>

                <Grid item xs={6} sm={6} sx={{ mb: 5, display:'flex',flexDirection:'column'}}>
                  <Typography paragraph variant="overline" sx={{ fontSize: 15 }}>
                    Pay To:
                  </Typography>
                  <Typography variant="body2">Shamwaa Aircargo Services</Typography>
                  <Typography variant="body2">Victoria Place Building</Typography>
                  <Typography variant="body2">Dar-es-Salaam, Tanzania</Typography>
                  <Typography variant="body2">Phone: +255 659 900 000</Typography>
                  <Typography variant="body2">E-mail: shamwaatz@gmail.com</Typography>
                </Grid>
              </Grid>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 960 }}>
                  <Table>
                    <TableHead
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                        '& th': { backgroundColor: 'transparent' },
                      }}
                    >
                      <TableRow sx={{ backgroundColor: "rgba(232, 236, 241, 1)" }}>
                        <TableCell width={120}>#Track No.</TableCell>
                        <TableCell align="left">Item</TableCell>
                        <TableCell align="left">Qty</TableCell>
                        <TableCell align="right">Unit price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                    {__invoice.data.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                        }}
                      >
                        <TableCell>{item.trackNumber}</TableCell>
                        <TableCell align="left">
                          <Box sx={{ maxWidth: 560 }}>
                            <Typography variant="subtitle2">{item.particulars}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">{item.weight}</TableCell>
                        <TableCell align="right">{fCurrency(item.unitPrice)}</TableCell>
                        <TableCell align="right">{fCurrency(item.totalAmountUSD)}</TableCell>
                      </TableRow>
                    ))}

                      <RowResultStyle>
                        <TableCell colSpan={3} />
                        <TableCell align="right">
                          <Box sx={{ mt: 2 }} />
                          <Typography variant="body1">Subtotal</Typography>
                        </TableCell>
                        <TableCell align="right" width={120}>
                          <Box sx={{ mt: 2 }} />
                          <Typography variant="body1">{fCurrency(__invoice.amountUSD)}</Typography>
                        </TableCell>
                      </RowResultStyle>
                      <RowResultStyle>
                        <TableCell colSpan={3} />
                        <TableCell align="right">
                          <Typography variant="body1">Taxes</Typography>
                        </TableCell>
                        <TableCell align="right" width={120}>
                          <Typography variant="body1">{fCurrency(0)}</Typography>
                        </TableCell>
                      </RowResultStyle>
                      <RowResultStyle>
                        <TableCell colSpan={3} />
                        <TableCell align="right">
                          <Typography variant="h6">Total(USD)</Typography>
                        </TableCell>
                        <TableCell align="right" width={140}>
                          <Typography variant="h6">{fCurrency(__invoice.amountUSD)}</Typography>
                        </TableCell>
                      </RowResultStyle>
                      <RowResultStyle>
                        <TableCell colSpan={3} />
                        <TableCell align="right">
                          <Typography variant="h6">Total(TZS)</Typography>
                        </TableCell>
                        <TableCell align="right" width={140}>
                          <Typography variant="h6">{fCurrency(__invoice.amountTZS)}</Typography>
                        </TableCell>
                      </RowResultStyle>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>

              <Divider sx={{ mt: 5 }} />

              <Grid container>
                <Grid item xs={12} md={9} sx={{ py: 3 }}>
                  <Typography variant="subtitle2">NOTES</Typography>
                  <Typography variant="body2">
                    We appreciate your business. Should you need us to add VAT or extra notes let us know!
                  </Typography>
                </Grid>
                
              </Grid>
            </Card>
          </Container>
        </Page>
      )
}
