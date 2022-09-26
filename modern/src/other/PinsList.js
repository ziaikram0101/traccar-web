/* eslint-disable */

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import {
  Divider, List, ListItemButton, ListItemText,
} from '@mui/material';

import { geofencesActions } from '../store';
import CollectionActions from '../settings/components/CollectionActions';
import { useCatchCallback } from '../reactHelper';

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
}));

const GeofencesList = ({ onGeofenceSelected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.geofences.items);

  const refreshGeofences = useCatchCallback(async () => {
    const response = await fetch('/api/geofences');
    if (response.ok) {
      dispatch(geofencesActions.refresh(await response.json()));
    } else {
      throw Error(await response.text());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   var mysql = require('mysql');
  //   var connection = mysql.createConnection({
  //     host: '137.184.36.250',
  //     user: 'tft',
  //     password: 'tft',
  //     database: 'tftdb'
  //   });

  //   connection.connect();

  //   connection.query('SELECT * FROM gs_geocoder_cache LIMIT 10', function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The solution is: ', results);
  //   });

  //   connection.end();
  // })

  return (
    <List className={classes.list}>
      {Object.values(items).map((item, index, list) => (
        <Fragment key={item.id}>
          <ListItemButton key={item.id} onClick={() => onGeofenceSelected(item.id)}>
            <ListItemText primary={item.name} />
            <CollectionActions itemId={item.id} editPath="/settings/geofence" endpoint="geofences" setTimestamp={refreshGeofences} />
          </ListItemButton>
          {index < list.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </List>
  );
};

export default GeofencesList;
