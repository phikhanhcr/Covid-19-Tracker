import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import './Infor.css'
function InfoBox({ title, cases, totalCase, active, isRed, ...props }) {
console.log(isRed)
  return (
      <Card className={`info-box ${isRed && 'infoBox--red'} `} onClick={props.onClick}>
        <CardContent>
          <Typography className="title" color="textPrimary">{title}</Typography>
          <h3 className="today">+ {cases}</h3>
          <Typography className="totalCase" color="textPrimary"><strong>Total: </strong>{totalCase}</Typography>
        </CardContent>
      </Card>
  );
}

export default InfoBox;