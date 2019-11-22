const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const ACCESS_STRING = `?access_key=${API_KEY}`;

export const API_URL = "http://apilayer.net/api/";

export const LIVE_URL = `${API_URL}live${ACCESS_STRING}`;

export const HISTORICAL_URL = `${API_URL}historical${ACCESS_STRING}&date=`;

export const CONVERT_URL = `${API_URL}convert${ACCESS_STRING}&from=`;

export const TIMEFRAME_URL = `${API_URL}timeframe${ACCESS_STRING}&start_date=`;

export const CHANGE_URL = `${API_URL}change${ACCESS_STRING}&currencies=`;
