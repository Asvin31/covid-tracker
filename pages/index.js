import { Card, CardContent, Grid, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from "react";
import CovidCards from '../components/CovidCards';
import CovidGraph from '../components/CovidGraph';
import CovidTable from '../components/CovidTable';
import { sortData } from '../utils';

export default function Home() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState('cases')

  const handleChange = async (event) => {
    const tempCountry = event.target.value;
    setCountry(tempCountry);
  };

  const handleCardClick = (value) => {
    setCaseType(value)
  }

  useEffect(() => {
    getCountries();
  }, [])

  const getCountries = async () => {
    const result = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await result.json();
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2
    }));
    let sortedData = sortData(data);
    setCountries(countries);
    setTableData(sortedData);
  }

  useEffect(() => {
    let url = "https://disease.sh/v3/covid-19/";
    url += country == "worldwide" ? "all" : `countries/${country}`;
    fetch(url).then(function (response) {
      response.json().then(function (result) {
        setCountryInfo(result)
      })
    })
  }, [country])
  return (
    <Container>
      <Head>
        <title>COVID-19 Tracker</title>
      </Head>
      <Grid item sm={12} xs={12} md={12} container justifyContent="space-evenly" spacing={2}>
        <Grid item sm={8} xs={12} md={8}>
          <Box sx={{ flexGrow: 1, mb: '2%' }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  COVID-19 Tracker
                </Typography>
                <FormControl >
                  <Select
                    variant="outlined"
                    id="country"
                    value={country}
                    onChange={handleChange}
                  >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map((country) => (
                      <MenuItem
                        key={country.value}
                        value={country.value}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Toolbar>
            </AppBar>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <CovidCards
              onClick={(e) => handleCardClick("cases")}
              title="Coronavirus Cases"
              cases={countryInfo?.todayCases}
              total={countryInfo?.cases}
            />
            <CovidCards
              onClick={(e) => handleCardClick("recovered")}
              title="Recovered"
              cases={countryInfo?.todayRecovered}
              total={countryInfo?.recovered}
            />
            <CovidCards
              onClick={(e) => handleCardClick("deaths")}
              title="Deaths"
              cases={countryInfo?.todayDeaths}
              total={countryInfo?.deaths}
            />
          </Stack>
        </Grid>
        <Grid item sm={4} xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Live cases by country</Typography>
              <CovidTable tableData={tableData} />
              <CovidGraph caseType={caseType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
