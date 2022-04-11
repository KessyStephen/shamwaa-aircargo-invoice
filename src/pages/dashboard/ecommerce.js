// @mui

import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceBestSalesman,
  EcommerceWidgetSummary,
} from '../../sections/@dashboard/general/e-commerce';

// ----------------------------------------------------------------------

GeneralEcommerce.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralEcommerce() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: E-commerce">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewProducts />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Product Sold"
              total={765}
              // percent={2.6}
              // chartColor={theme.palette.primary.main}
              // chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Balance"
              total={18765}
              // percent={-0.1}
              // chartColor={theme.palette.chart.green[0]}
              // chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Sales Profit"
              total={4876}
              // percent={0.6}
              // chartColor={theme.palette.chart.red[0]}
              // chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceBestSalesman />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
