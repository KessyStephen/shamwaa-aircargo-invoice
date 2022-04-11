import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
} from '@mui/material';

import getInvoiceData from '../utils/getInvoiceData';
import { addInvoiceData } from '../redux/slices/invoice';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar} from '../sections/@dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'trackNumber', label: 'Track Number', alignRight: false },
  { id: 'clientName', label: 'Client Name', alignRight: false },
  { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
  { id: 'particulars', label: 'Particulars', alignRight: false },
  { id: 'weight', label: 'Weight', alignRight: false },
  { id: 'unitPrice', label: 'Unit Price', alignRight: false },
  { id: 'totalPriceUSD', label: 'Total Price(USD)', alignRight: false },
  { id: 'totalPriceTZS', label: 'Total Price(TZS)', alignRight: false },
  { id: 'invoice', label: 'Invoice', alignRight: false },
  { id: 'payment', label: 'Payment', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if(array.length > 0){
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.clientName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }
  return [];
}

const User = () => {
  const airtableUsers = useSelector(state => state.users.value);
  const dispatch = useDispatch()

  const router = useRouter();

  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName] = useState('');
  const [USERLIST, setUSERLIST] = useState([]);

  useEffect(() => {
    if(airtableUsers){
      setUSERLIST(airtableUsers);
    }
  },[USERLIST,airtableUsers])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const checkSelected = (id) => {
    const check = selected.findIndex(user => user.id === id);
    if(check !== -1) return true;
    return false;
  }

  const handleClick = (event, singleUser) => {
    const selectedIndex = checkSelected(singleUser.id);
    if(selectedIndex) {
      const toRemove = [...selected]
      const value = toRemove.filter(item => item.id !== singleUser.id);
      setSelected(value);
    }else {
      setSelected([...selected, singleUser]);
    }
    
  };

  const handleDownload = () => {
    if(selected.length > 0){
      const invoiceData = getInvoiceData(selected);
      dispatch(addInvoiceData(invoiceData));
      router.push('/invoice');
    }
   
  }

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Invoice | Shamwaa Customer">
      <Container sx={{marginTop:10}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            variant="contained"
            to="#"
            startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}
            onClick={() => router.push('/')}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            to="#"
            startIcon={<Iconify icon="fa:cloud-download" />}
            onClick={handleDownload}
          >
            Invoice
          </Button>
        </Stack>

        <Card sx={{ minWidth: 900 }}>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((singleUser) => {
                      const { id, 
                        trackNumber, 
                        clientName, 
                        phoneNumber, 
                        particulars, 
                        weight,
                        unitPrice,
                        totalPriceUSD,
                        totalPriceTZS,
                        invoice,
                        payment
                       } = singleUser;
                       
                      const isItemSelected = checkSelected(id)

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, singleUser)}
                            />
                          </TableCell>
                          <TableCell  align='left'>{trackNumber}</TableCell>
                          <TableCell align="left">{clientName}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">{particulars}</TableCell>
                          <TableCell align="left">{weight}</TableCell>
                          <TableCell align="left">{unitPrice}</TableCell>
                          <TableCell align="left">{totalPriceUSD}</TableCell>
                          <TableCell align="left">{totalPriceTZS}</TableCell>
                          <TableCell align="left">{invoice}</TableCell>
                          <TableCell align="left">{payment}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

export default User;
