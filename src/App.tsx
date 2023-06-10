/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { GeoLocationData, WeatherForecastData, getFirstGeoLocationData, getWeatherForecastData } from './helpers/utils';

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
					<p>Location Name: {locationResult.display_name}</p>
					<p>Latitude: {locationResult.lat}</p>
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
											<td key={tableHeader}>
												<div>
													<p>
													Day: {weatherData[tableHeader]?.dayOfWeek}
													</p>
													<p>
													Max Temp: {weatherData[tableHeader]?.maxTemperature}
													</p>
													<p>
													Min Temp: {weatherData[tableHeader]?.minTemperature}
													</p>
												</div>
											</td>
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
