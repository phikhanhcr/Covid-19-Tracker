import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Button, Select, Card } from '@material-ui/core'
import './App.css';
import Table from './components/Table'
import 'leaflet/dist/leaflet.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import LineGrap from './components/LineGrap';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [center, setMapCenter] = useState({ lat: 34.8746, lng: -40.7946 });
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setColorType] = useState('cases');
const [tableData, setTableData] = useState([])
  // fetch data from worldwide
  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then(res => res.json())
        .then(data => {
          setCountryInfo(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    getCountryInfo();
  }, [])
  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {
          const allCountry = data.map(ele => ({
            name: ele.country,
            value: ele.countryInfo.iso2
          }))
          setCountries(allCountry)
          setMapCountries(data)
          setTableData(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    getCountries();

  }, [])
  const onChangeCountry = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)


    // worldwide
    let url = countryCode === "WorldWide" ?
      "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    console.log(url)
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCountryInfo(data);
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long })
        setZoom(4.5)
      }).catch(err => {
        console.log(err.message)
      })
  }
  return (
    <div className="App">
      {/* Header */}
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onChangeCountry} value={country}>
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {
                countries.map((ele) =>
                  <MenuItem value={ele.value}>
                    {ele.name}
                  </MenuItem>
                )
              }

            </Select>
          </FormControl>
        </div>

        {/* three box */}
        <div className="app__boxInfo">
          <InfoBox
            isRed={true}
            active={casesType === "cases"}
            onClick={(e) => setColorType('cases')}
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            totalCase={countryInfo.cases} />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setColorType('recovered')}
            title="Recovered Case"
            cases={countryInfo.todayRecovered}
            totalCase={countryInfo.recovered} />
          <InfoBox
            isRed={true}
            active={casesType === "deaths"}
            onClick={(e) => setColorType('deaths')}
            title="Passed Away"
            cases={countryInfo.todayDeaths} t
            totalCase={countryInfo.deaths} />

        </div>
        <Map center={center} casesType={casesType} countries={mapCountries} zoom={zoom} />
      </div>

      <Card className="app__right">
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}>
        
        </Table>
        <h3 style={{margin:"10px"}}>WorldWide Chart</h3>
        <LineGrap />
      </Card>
    </div>
  );
}

export default App;
