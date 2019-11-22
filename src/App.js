import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";

import {
  LIVE_URL,
  HISTORICAL_URL,
  CONVERT_URL,
  TIMEFRAME_URL,
  CHANGE_URL
} from "./config/urls";
import { countries } from "./components/countries";

export default function App() {
  const access_string = "&format=1";

  const [live, setLive] = useState([]);
  const [liveCount, setLiveCount] = useState(10);
  const [history, setHistory] = useState([]);
  const [historyCount, setHistoryCount] = useState(10);
  const [date, setDate] = useState("2010-10-10");

  // "live" - get the most recent exchange rate data
  const fetchLive = () => {
    axios({
      method: "get",
      url: `${LIVE_URL}${access_string}/`
    })
      .then(res => {
        const { quotes } = res.data;
        const countryList = Object.keys(countries);
        const results = Object.keys(quotes).map(key => {
          const subKey = key.substring(3);
          return (
            <ListGroupItem key={`live-${key}}`}>
              <div>{countryList.includes(subKey) ? countries[subKey] : ""}</div>
              <div>{quotes[key]}</div>
            </ListGroupItem>
          );
        });
        setLive(results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // "historical" - get historical rates for a specific day
  const fetchHistorical = () => {
    axios({
      method: "get",
      url: `${HISTORICAL_URL}${date}${access_string}`
    })
      .then(res => {
        const { quotes } = res.data;
        const countryList = Object.keys(countries);
        const results = Object.keys(quotes).map(key => {
          const subKey = key.substring(3);
          return (
            <ListGroupItem key={`history-${key}}`}>
              <div>{countryList.includes(subKey) ? countries[subKey] : ""}</div>
              <div>{quotes[key]}</div>
            </ListGroupItem>
          );
        });
        setHistory(results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // "convert" - convert one currency to another
  const fetchConversionRates = () => {
    axios({
      method: "get",
      url: `${CONVERT_URL}EUR&to=GBP&amount=100${access_string}`
    })
      .then(res => {
        console.log("conversion", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // "timeframe" - request exchange rates for a specific period of time
  const fetchTimeAccording = () => {
    axios({
      method: "get",
      url: `${TIMEFRAME_URL}2015-01-01&end_date=2015-05-01${access_string}`
    })
      .then(res => {
        console.log("time frame", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // "change" - request any currency's change parameters (margin, percentage)
  const fetchChange = () => {
    axios({
      method: "get",
      url: `${CHANGE_URL}USD,EUR${access_string}`
    })
      .then(res => {
        console.log("change parameters", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLive();
    fetchHistorical();
    // fetchConversionRates();
    // fetchTimeAccording();
    // fetchChange();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="6" sm="4">
          <h3>
            <Badge color="primary">Most recent exchange rate</Badge>
          </h3>
          <ListGroup>{live.slice(0, liveCount)}</ListGroup>
          <Button color="primary" onClick={() => setLiveCount(liveCount + 10)}>
            Load More..
          </Button>
        </Col>
        <Col xs="6" sm="4">
          <h3>
            <Badge color="danger">Historical rates for {date}</Badge>
          </h3>
          <ListGroup>{history.slice(0, historyCount)}</ListGroup>
          <Button
            color="danger"
            onClick={() => setHistoryCount(historyCount + 10)}
          >
            Load More..
          </Button>
        </Col>
        <Col sm="4">.col-sm-4</Col>
      </Row>
    </Container>
  );
}
