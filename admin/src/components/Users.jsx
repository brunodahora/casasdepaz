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

const getBooleanValue = column => row => {
  if (row[column] === undefined || row[column] === null) return 'Não preenchido';

  return row[column] ? 'Sim' : 'Não';
};

const getCellValue = column => row => (isEmpty(row[column]) ? 'Não preenchido' : row[column]);

const headers = [
  { label: 'CPF', key: 'cpf' },
  { label: 'Nome', key: 'name' },
  { label: 'Sobrenome', key: 'surname' },
  { label: 'E-mail', key: 'email' },
  { label: 'Telefone', key: 'phone' },
  { label: 'Sexo', key: 'gender' },
  { label: 'Idade', key: 'age' },
  { label: 'Participa de uma célula', key: 'hasCellGroup' },
];

export default class Users extends React.Component {
  state = {
    csvData: [],
    columns: [
      { name: 'cpf', title: 'CPF', getCellValue: getCellValue('cpf') },
      { name: 'name', title: 'Nome', getCellValue: getCellValue('name') },
      { name: 'surname', title: 'Sobrenome', getCellValue: getCellValue('surname') },
      { name: 'email', title: 'E-mail', getCellValue: getCellValue('email') },
      { name: 'phone', title: 'Telefone', getCellValue: getCellValue('phone') },
      { name: 'gender', title: 'Sexo', getCellValue: getCellValue('gender') },
      { name: 'age', title: 'Idade', getCellValue: getCellValue('age') },
      {
        name: 'hasCellGroup',
        title: 'Participa de uma célula',
        getCellValue: getBooleanValue('hasCellGroup'),
      },
    ],
    rows: [],
    pageSizes: [50, 100, 200],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    numUsers: 0,
  };

  generateCsvData = rows => {
    let csvData = [];
    rows.forEach(({ uid, cpf, name, surname, email, phone, gender, age, hasCellGroup }) => {
      csvData.push({
        id: uid,
        cpf: cpf || 'Não preenchido',
        name: name || 'Não preenchido',
        surname: surname || 'Não preenchido',
        email: email || 'Não preenchido',
        phone: phone || 'Não preenchido',
        sex: gender || 'Não preenchido',
        age: age || 'Não preenchido',
        hasCellGroup: hasCellGroup || 'Não preenchido',
      });
    });
    return csvData;
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let rows = [];
        querySnapshot.forEach(doc => {
          rows.push(doc.data());
        });
        const csvData = this.generateCsvData(rows);
        this.setState({ rows, csvData, numUsers: rows.length });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { csvData, rows, columns, pageSizes, tableColumnExtensions, numUsers } = this.state;

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
            Total {numUsers}
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
