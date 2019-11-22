export const API_URL = process.env.REACT_APP_WEATHER_API_URL;

const access_key = "?access_key=38a937e08594d60085940d6dfbe15a36";

export const LIVE_URL = `${API_URL}live${access_key}`;

export const HISTORICAL_URL = `${API_URL}historical${access_key}&date=`;

export const CONVERT_URL = `${API_URL}convert${access_key}&from=`;

export const TIMEFRAME_URL = `${API_URL}timeframe${access_key}&start_date=`;

export const CHANGE_URL = `${API_URL}change${access_key}&currencies=`;
