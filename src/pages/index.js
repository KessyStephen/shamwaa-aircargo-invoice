
// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Image from '../components/Image';
// sections
import AirtableForm from '../components/form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  const mdUp = useResponsive('up', 'md');

  return (
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Shamwaa Invoice Generator
              </Typography>
              <Image
                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_login.png"
                alt="login"
              />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <AirtableForm />
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
  );
}
