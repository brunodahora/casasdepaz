// @flow

import * as React from 'react';
import * as firebase from 'firebase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  FilteringState,
  SortingState,
  PagingState,
  IntegratedPaging,
  IntegratedFiltering,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import { CSVLink } from 'react-csv';

const isEmpty = value => value === undefined || value === null || value.length === 0;

const getTypeValue = row => {
  if (isEmpty(row['type'])) return '---';

  if (row['type'] !== 'Outro') return row['type'];

  return row['otherType'];
};

const getCellValue = column => row => (isEmpty(row[column]) ? '---' : row[column]);

const headers = [
  { label: 'Mensageiro', key: 'user' },
  { label: 'Tipo', key: 'type' },
  { label: 'Nome', key: 'name' },
  { label: 'Dono', key: 'owner' },
  { label: 'E-mail', key: 'email' },
  { label: 'Telefone', key: 'phone' },
  { label: 'Parceiro', key: 'partner' },
  { label: 'Endereço', key: 'address' },
  { label: 'CEP', key: 'cep' },
  { label: 'Bairro', key: 'neighborhood' },
  { label: 'Cidade', key: 'city' },
  { label: 'Estado', key: 'state' },
  { label: 'Horário', key: 'time' },
];

export default class Places extends React.Component {
  state = {
    csvData: [],
    columns: [
      { title: 'Mensageiro', name: 'user', getCellValue: getCellValue('user') },
      { title: 'Tipo', name: 'type', getCellValue: getTypeValue },
      { title: 'Nome', name: 'name', getCellValue: getCellValue('name') },
      { title: 'Dono', name: 'owner', getCellValue: getCellValue('owner') },
      { title: 'E-mail', name: 'email', getCellValue: getCellValue('email') },
      { title: 'Parceiro', name: 'partner', getCellValue: getCellValue('partner') },
      { title: 'Telefone', name: 'phone', getCellValue: getCellValue('phone') },
      { title: 'Endereço', name: 'address', getCellValue: getCellValue('address') },
      { title: 'CEP', name: 'cep', getCellValue: getCellValue('cep') },
      { title: 'Bairro', name: 'neighborhood', getCellValue: getCellValue('neighborhood') },
      { title: 'Cidade', name: 'city', getCellValue: getCellValue('city') },
      { title: 'Estado', name: 'state', getCellValue: getCellValue('state') },
      { title: 'Horário', name: 'time', getCellValue: getCellValue('time') },
    ],
    rows: [],
    pageSizes: [50, 100, 200],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    numPlaces: 0,
  };

  generateCsvData = rows => {
    let csvData = [];
    rows.forEach(
      ({
        uid,
        user,
        type,
        name,
        owner,
        email,
        partner,
        phone,
        address,
        cep,
        neighborhood,
        city,
        state,
        time,
      }) => {
        csvData.push({
          id: uid,
          user,
          type,
          name,
          owner,
          email,
          partner,
          phone,
          address,
          cep,
          neighborhood,
          city,
          state,
          time,
        });
      }
    );
    return csvData;
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection('places')
      .get()
      .then(async querySnapshot => {
        let rows = [];
        querySnapshot.forEach(doc => {
          rows.push(doc.data());
        });
        for (let i = 0; i < rows.length; i++) {
          try {
            if (rows[i].userId) {
              const userQuerySnapshot = await firebase
                .firestore()
                .collection('users')
                .doc(rows[i].userId)
                .get();
              const userData = userQuerySnapshot.data();
              rows[i].user = `${userData.name} ${userData.surname}`;
            }
          } catch (error) {
            console.log(error);
          }
        }
        const csvData = this.generateCsvData(rows);
        this.setState({ rows, csvData, numPlaces: rows.length });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { csvData, rows, columns, pageSizes, tableColumnExtensions, numPlaces } = this.state;

    return (
      <Paper>
        <div
          style={{
            padding: '8px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {!!csvData.length && (
            <CSVLink
              data={csvData}
              headers={headers}
              filename={'users.csv'}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained" color="primary">
                Download
              </Button>
            </CSVLink>
          )}
          <Typography component="h4" gutterBottom>
            Total {numPlaces}
          </Typography>
        </div>
        <Grid rows={rows} columns={columns}>
          <FilteringState />
          <SortingState />
          <PagingState defaultCurrentPage={0} defaultPageSize={pageSizes[1]} />

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />

          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />

          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>
    );
  }
}
