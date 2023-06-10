/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { GeoLocationData, WeatherForecastData, getFirstGeoLocationData, getWeatherForecastData } from './helpers/utils';
import SummaryTable from './components/SummaryTable';
import LocationPanel from './components/LocationPanel';
import SearchInput from './components/SearchInputs';

export default function App() {
	const [search, setSearch] = useState('');
	const [locationResult, setLocationResult] = useState<GeoLocationData | null>(null);
	const	[weatherData, setWeatherData] = useState< WeatherForecastData | null >(null);

	const searchHandler = async () => {
		const geoLocationData = await getFirstGeoLocationData(search);
		setLocationResult(geoLocationData);
		const weatherForecastData = await getWeatherForecastData(geoLocationData);
		setWeatherData(weatherForecastData);
	};

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			marginLeft: '50px',
		}}>
			<h1>STAG Project</h1>
			<SearchInput search={search} onInputChange={setSearch} onSearch={searchHandler}/>
			{locationResult && <LocationPanel locationResult={locationResult}/>}
			{weatherData && <SummaryTable weatherData={weatherData}/>}	
		</div>
	);
}
