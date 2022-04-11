import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function AirtableForm() {
  const router = useRouter();

  const batchSchema = Yup.object().shape({
    batchNumber: Yup.string().required('batch number is required'),
  });

  const formik = useFormik({
    initialValues: {
      batchNumber: '',
    },
    validationSchema: batchSchema,
    onSubmit: (values) => {
      router.push({pathname:'/fetchData',query: {batchNumber:values.batchNumber}});
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

 

  return (
    <FormikProvider value={formik}>
      
      <Form noValidate sx={{ display:'flex', alignItems:'center', backgroundColor:'blue'}} >
        <Box sx={{ width: '100%', height: 200, cursor: 'pointer'}}>
            <img 
              alt='logo'
              src="https://firebasestorage.googleapis.com/v0/b/shamwaa-website.appspot.com/o/shamwaa-logo-black2.png?alt=media&token=97e25d47-0013-4020-910f-a5ed714b3ff9"
            />
        </Box>
        <Stack spacing={3}>
          <TextField
            autoComplete="true"
            fullWidth
            type="text"
            label="Batch Number"
            {...getFieldProps('batchNumber')}
            error={Boolean(touched.batchNumber && errors.batchNumber)}
            helperText={touched.batchNumber && errors.batchNumber}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}/>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Get Records
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
