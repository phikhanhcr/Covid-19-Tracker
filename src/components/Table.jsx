import React from 'react';
import { sortingData } from './util';


function Table({ countries }) {
  return (
    <div className="table">
      <tr>
        <th>Country</th>
        <th>Total Cases</th>
      </tr>
      {
        sortingData(countries).map(ele => (
          <tr>
            <td>{ele.country}</td>
            <td>{ele.cases}</td>
          </tr>
        ))
      }
    </div>
  );
}

export default Table;