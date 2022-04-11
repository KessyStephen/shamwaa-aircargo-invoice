import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Airtable from 'airtable';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addUsers } from '../redux/slices/user';
import { addDispatchNumber } from '../redux/slices/invoice';

const base = new Airtable({apiKey: 'keyyQvQH6v0hK0FkB'}).base('appjDv92e5duksB0a');

function FetchData() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const airtableData = (batchNumber) => {
        base(batchNumber).select({
        fields: ["TRACK NUMBER TZ", "CLIENT NAME", "PHONE NUMBER","PARTICULARS", "WEIGHT",
                "UNIT PRICE","TOTAL USD","TOTAL TZS","INVOICE","PAYMENT"]
        }).eachPage((records, fetchNextPage) => {
          const airtableRecords = records.map((record,index) => ({
            id: index,
            trackNumber: record.get('TRACK NUMBER TZ'),
            clientName: record.get('CLIENT NAME'),
            phoneNumber: record.get('PHONE NUMBER'),
            particulars: record.get('PARTICULARS'),
            weight: record.get('WEIGHT'),
            unitPrice: record.get('UNIT PRICE'),
            totalPriceUSD: record.get('TOTAL USD'),
            totalPriceTZS: record.get('TOTAL TZS'),
            invoice: record.get('INVOICE'),
            payment: record.get('PAYMENT')
          }))
          setData([...data, ...airtableRecords]);

          fetchNextPage();
      
        }, (err) => {
          if(err){ router.push('/') }
        })
      }
      const batchNumber = router.query.batchNumber.trim();
      airtableData(batchNumber);
    
  },[data, router])

  useEffect(() => {
    if(data.length > 0){
      dispatch(addDispatchNumber(router.query.batchNumber.trim()));
      dispatch(addUsers(data));
      router.push('/userList');
    }
  },[data])

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <CircularProgress />
    </Box>
  )
}

export default FetchData