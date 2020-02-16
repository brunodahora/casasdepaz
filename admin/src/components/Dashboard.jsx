import React from 'react';
import * as firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 8,
  },
  title: {
    fontSize: 21,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [numUsers, setNumUsers] = React.useState(null);
  const [numTargets, setNumTargets] = React.useState(null);
  const [numPlaces, setNumPlaces] = React.useState(null);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let rows = [];
        querySnapshot.forEach(doc => {
          rows.push(doc.data());
        });
        setNumUsers(rows.length);
      })
      .catch(error => console.log(error));
  }, []);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('places')
      .get()
      .then(querySnapshot => {
        let targets = [];
        let places = [];
        querySnapshot.forEach(doc => {
          const place = doc.data();
          if (place.address) {
            places.push(place);
          } else {
            targets.push(place);
          }
        });
        setNumTargets(targets.length);
        setNumPlaces(places.length);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <GridList cellHeight={200} className={classes.gridList} cols={4}>
      <GridListTile key="users" cols={1}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Número de Mensageiros
            </Typography>
            <Typography variant="h5" component="h2">
              {numUsers === null ? <CircularProgress /> : numUsers}
            </Typography>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile key="targets" cols={1}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Número de Alvos de Fé
            </Typography>
            <Typography variant="h5" component="h2">
              {numTargets === null ? <CircularProgress /> : numTargets}
            </Typography>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile key="places" cols={1}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Número de Casas Preenchidas
            </Typography>
            <Typography variant="h5" component="h2">
              {numPlaces === null ? <CircularProgress /> : numPlaces}
            </Typography>
          </CardContent>
        </Card>
      </GridListTile>
      <GridListTile key="discipleship" cols={1}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Número de Discipulados
            </Typography>
            <Typography variant="h5" component="h2">
              0
            </Typography>
          </CardContent>
        </Card>
      </GridListTile>
    </GridList>
  );
};

export default Dashboard;
