/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { useState } from 'react';
import { format, getDay } from 'date-fns';
import { parseForecast } from './nwsApiHelper';


const getDayOfWeek = (startTime: Date) => {
	const day = getDay(startTime);

	switch (day) {
	case 0:
		return 'Sunday';
	case 1:
		return 'Monday';
	case 2:
		return 'Tuesday';
	case 3:
		return 'Wednesday';
	case 4:
		return 'Thursday';
	case 5:
		return 'Friday';
	case 6:
		return 'Saturday';
	default:
		throw new Error('Invalid day');
	}
};


export default function App() {
	const [search, setSearch] = useState('');
	const [locationResult, setLocationResult] = useState(null);
	const	[weatherData, setWeatherData] = useState(null);

	const searchHandler = async () => {
		const locationResponse = await axios.get('https://nominatim.openstreetmap.org/search.php', {
			params: {
				q: search,
				polygon_geojson: 0,
				format: 'jsonv2',
			}
		});

		setLocationResult(locationResponse.data[0]);


		const weatherResult = await axios.get('https://forecast.weather.gov/MapClick.php', {
			params: {
				lat: locationResponse.data[0].lat,
				lon: locationResponse.data[0].lon,
				FcstType: 'digitalDWML',
			}
		});

		const parsedWeatherData = parseForecast(weatherResult.data);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const formattedWeatherData = parsedWeatherData.map(({startTime, endTime, hourlyTemperature}) => ({
			dayOfWeek: getDayOfWeek(startTime),
			startDate: format(startTime, 'd LLL'),
			endDate: format(endTime, 'd LLL'),
			hourlyTemperature,
		})).reduce((acc, data) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (acc[data.startDate]) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
				acc[data.startDate].push(data);
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
				acc[data.startDate] = [data];
			}

			return acc;
		}, {});

		const tempPeaks = Object.entries(formattedWeatherData).reduce((acc, [key, values]: [string, any]) => {
			const temps = values.map(({ hourlyTemperature }: any) => hourlyTemperature);
			const maxTemperature = Math.max(...temps);
			const minTemperature = Math.min(...temps);
			
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			acc[key] = { 
				maxTemperature,
				minTemperature,
				dayOfWeek: values[0].dayOfWeek,
				startDate: values[0].startDate,
				endDate: values[0].endDate
			};
			
			return acc;
		}, {});

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setWeatherData(tempPeaks);
	};

	const tableHeaders = weatherData ? Object.keys(weatherData) : [];

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			marginLeft: '50px',
		}}>
			<h1>STAG Project</h1>
			<div>
				<input type="text" value={search} onChange={e => setSearch(e.target.value)} style={{
					marginRight: '2px',
				}}/>
				<button type='submit' onClick={searchHandler}>Search</button>
			</div>
			{locationResult && (
				<div>
					<h2>Location Summary</h2>
					{/* @ts-ignore */}
					<p>Location Name: {locationResult.display_name}</p>
					{/* @ts-ignore */}
					<p>Latitude: {locationResult.lat}</p>
					{/* @ts-ignore */}
					<p>Longitude: {locationResult.lon}</p>
				</div>
			)

			}
			{
				weatherData && (
					<div>
						<h2>Weather Summary</h2>
						<table>
							<thead>
								<tr>
									{tableHeaders.map(tableHeader => (
										<th key={tableHeader}>{tableHeader}</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									{
										tableHeaders.map(tableHeader => (
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											<td key={tableHeader}>{weatherData[tableHeader]?.dayOfWeek}</td>
										))
									}
								</tr>
								<tr>
									{
										tableHeaders.map(tableHeader => (
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											<td key={tableHeader}>Max Temp: {weatherData[tableHeader]?.maxTemperature}</td>
										))
									}
								</tr>
								<tr>
									{
										tableHeaders.map(tableHeader => (
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											// @ts-ignore
											<td key={tableHeader}>Min Temp: {weatherData[tableHeader]?.minTemperature}</td>
										))
									}
								</tr>
							</tbody>
						</table>
		
					</div>
				)
			}
		</div>
	);
}
