import { Circle, Popup } from 'react-leaflet';
import React from 'react'

import numeral from 'numeral'
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200
  },
  deaths: {
    hex: "#fd4443",
    multiplier: 2000
  }
}
export const showDataOnMap = (data, casesType ) => (
  data.map(country => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div className="flag-country" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
          <div className="nameCountry">{country.country}</div>
          <div>
            <strong>Population: </strong> 
            {numeral(country.population).format("0,0")}
          </div>
          <div><strong>Tests: </strong>{numeral(country.tests).format("0,0")}</div>
          <div><strong>Total Case: </strong>{numeral(country.cases).format("0,0")}</div>
          <div><strong>Recovered: </strong> {numeral(country.recovered).format("0,0")}</div>
          <div><strong>Deaths: </strong>{numeral(country.deaths).format("0,0")}</div>
        </div>


      </Popup>

    </Circle>
  ))
) 