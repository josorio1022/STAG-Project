/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState } from 'react';

import {
	GeoLocationData,
	GroupedWeatherData,
	WeatherForecastData,
	formatWeatherForecastData,
	getFirstGeoLocationData,
	getWeatherForecastData,
} from './helpers/utils';

import SummaryTable from './components/SummaryTable';
import LocationPanel from './components/LocationPanel';
import SearchInput from './components/SearchInputs';
import DetailedWeatherPanel from './components/DetailedWeatherPanel';

export default function App() {
	const [search, setSearch] = useState('');
	const [locationResult, setLocationResult] = useState<GeoLocationData | null>(null);
	const	[weatherData, setWeatherData] = useState< WeatherForecastData | null >(null);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [fullForeCastData, setFullForeCastData] = useState<GroupedWeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const searchHandler = async () => {
		if (!search) {
			setError('Please enter a location');
			return; 
		}
		try {
			setIsLoading(true);
			const geoLocationData = await getFirstGeoLocationData(search);
			setError(null);
			setLocationResult(geoLocationData);
			const weatherForecastData = await getWeatherForecastData(geoLocationData);
			setFullForeCastData(weatherForecastData);
			setWeatherData(formatWeatherForecastData(weatherForecastData));
			setIsLoading(false);
		} catch (e) {
			const err = e as Error;
			setError(err.message);
		}

	};


	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			marginLeft: '50px',
			padding: '20px',
			borderRadius: '10px',
			maxWidth: '100%',
			margin: 'auto',
			minWidth: '50vw'
		}}>
			<h1 style={{ 
				textAlign: 'center', 
				color: '#333',
				borderBottom: '1px solid #333',
				paddingBottom: '10px'
			}}>
        STAG Project
			</h1>
			{isLoading && <p>Loading... Please wait.</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<SearchInput 
				search={search} 
				onInputChange={setSearch} 
				onSearch={searchHandler}
			/>
			{!error && locationResult && <LocationPanel locationResult={locationResult}/>}
			{!error && weatherData && <SummaryTable weatherData={weatherData} onCellClick={setSelectedDate}/>}
			{!error && fullForeCastData && selectedDate && <DetailedWeatherPanel weatherData={fullForeCastData[selectedDate]}/>}
		</div>
	);
}
