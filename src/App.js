import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    Button,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col,
    Badge,
    Table
} from "reactstrap";
import DatePicker from "react-date-picker";
import { Multiselect } from "multiselect-react-dropdown";

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
    const [startDate, setStartDate] = useState(new Date());
    const [selected] = useState([]);
    const [multiSelectTag, setMultiSelectTag] = useState([]);
    const [multiSelectList, setMultiSelectList] = useState([]);
    const [comparisonTable, setComparisonTable] = useState([]);

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
                    return ( <
                        ListGroupItem key = { `live-${key}}` } >
                        <
                        div > { countryList.includes(subKey) ? countries[subKey] : "" } < /div> <
                        div > { quotes[key] } < /div> <
                        /ListGroupItem>
                    );
                });
                setLive(results);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // "historical" - get historical rates for a specific day
    const fetchHistorical = date => {
        axios({
                method: "get",
                url: `${HISTORICAL_URL}${date}${access_string}`
            })
            .then(res => {
                const { quotes } = res.data;
                const countryList = Object.keys(countries);
                const results = Object.keys(quotes).map(key => {
                    const subKey = key.substring(3);
                    return ( <
                        ListGroupItem key = { `history-${key}}` } >
                        <
                        div > { countryList.includes(subKey) ? countries[subKey] : "" } < /div> <
                        div > { quotes[key] } < /div> <
                        /ListGroupItem>
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
                console.log("time according", res.data);
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

    // "comparison" - comparison between a group of currencies to a single currency
    const fetchComparison = () => {
        const string = multiSelectList.join(",");
        axios({
                method: "get",
                url: `${LIVE_URL}&currencies=${string}&source=USD&format=1`
            })
            .then(res => {
                const { quotes } = res.data;
                const countryList = Object.keys(countries);
                const results = Object.keys(quotes).map((key, index) => {
                    const subKey = key.substring(3);
                    return ( <
                        tr key = { `comparison-${key}}` } >
                        <
                        th scope = "row" > { index + 1 } < /th> <
                        td > { countryList.includes(subKey) ? countries[subKey] : "" } < /td> <
                        td > { quotes[key] } < /td> <
                        /tr>
                    );
                });
                setComparisonTable(results);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const fetchHistoricalAgain = event => {
        setStartDate(event);
        setDate(convert(event));
        fetchHistorical(convert(event));
    };

    const convert = str => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    };

    const onMultiselect = (optionsList, selectedItem) => {
        const array1 = multiSelectList;
        array1.push(selectedItem.value);
        setMultiSelectList(array1);
    };

    useEffect(() => {
        fetchLive();
        fetchHistorical(date);
        fetchConversionRates();
        fetchTimeAccording();
        fetchChange();
        const countryDropDownItems = Object.keys(countries).map((key, index) => {
            return { id: `country-${index + 1}`, label: countries[key], value: key };
        });
        setMultiSelectTag( <
            Multiselect options = {
                countryDropDownItems && countryDropDownItems.constructor === Array ?
                countryDropDownItems :
                    []
            } // Options to display in the dropdown
            selectedvalues = { selected } // Preselected value to persist in dropdown
            onSelect = { onMultiselect } // Function will trigger on select event
            displayValue = "label" // Property name to display in the dropdown options
            selectionLimit = { 10 }
            style = {
                {
                    chips: {
                        // To change css chips(Selected options)
                        background: "black"
                    }
                }
            }
            />
        );
    }, []);

    return ( <
        >
        <
        header className = "w3-container w3-theme w3-padding"
        id = "myHeader" >
        <
        div className = "w3-center" >
        <
        h1 > Currency Conversion < /h1> <
        /div> <
        /header>

        <
        div className = "w3-row-padding w3-center w3-margin-top" >
        <
        div className = "w3-third" >
        <
        div className = "w3-card w3-container"
        style = {
            { minHeight: "890px" } } >
        <
        h3 > Most recent exchange rate < /h3> <
        br / >
        <
        i className = "fa fa-exchange w3-margin-bottom w3-text-theme"
        style = {
            { fontSize: "116px" } } >
        < /i> <
        br / >
        <
        ListGroup className = "list-scroll" > { live.slice(0, liveCount) } <
        /ListGroup> <
        br / >
        <
        Button className = "w3-button w3-theme"
        onClick = {
            () => setLiveCount(liveCount + 10) } >
        Load More.. <
        /Button> <
        /div> <
        /div>

        <
        div className = "w3-third" >
        <
        div className = "w3-card w3-container"
        style = {
            { minHeight: "890px" } } >
        <
        h3 > Historical rates
        for { date } < /h3> <
        br / >
        <
        i className = "fa fa-calendar w3-margin-bottom w3-text-theme"
        style = {
            { fontSize: "90px" } } >
        < /i> <
        br / >
        <
        DatePicker onChange = { fetchHistoricalAgain }
        value = { startDate }
        /> <
        br / >
        <
        ListGroup className = "list-scroll" > { history.slice(0, historyCount) } <
        /ListGroup> <
        br / >
        <
        Button className = "w3-button w3-theme"
        onClick = {
            () => setHistoryCount(historyCount + 10) } >
        Load More.. <
        /Button> <
        /div> <
        /div>

        <
        div className = "w3-third" >
        <
        div className = "w3-card w3-container"
        style = {
            { minHeight: "890px" } } >
        <
        h3 > Comparison with USD < /h3> <
        br / >
        <
        i className = "fa fa-usd w3-margin-bottom w3-text-theme"
        style = {
            { fontSize: "116px" } } >
        < /i> { multiSelectTag } <
        Button className = "w3-button w3-theme"
        onClick = { fetchComparison } >
        Submit <
        /Button> {
            comparisonTable.length ? ( <
                >
                <
                Table >
                <
                thead >
                <
                tr style = {
                    { width: "10%" } } >
                <
                th > S.no < /th> <
                th > Country < /th> <
                th > Rate < /th> <
                /tr> <
                /thead> <
                /Table> <
                div className = "table-scroll" >
                <
                Table >
                <
                tbody > { comparisonTable } < /tbody> <
                /Table> <
                /div> <
                />
            ) : ( <
                h4 > (Table will appear below) < /h4>
            )
        } <
        /div> <
        /div> <
        /div> <
        />
    );
}