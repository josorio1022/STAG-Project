/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { WeatherForecastData } from '../helpers/utils';

export default function SummaryTable({ weatherData = {}, onCellClick }: { weatherData: WeatherForecastData, onCellClick: (date: string) => void }) {
	const tableHeaders = Object.keys(weatherData);

	return (
		<div style={{ 
			backgroundColor: '#fff', 
			padding: '20px', 
			borderRadius: '10px', 
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
			margin: '20px 0',
			width: '100%',
		}}>
			<h2 style={{ 
				color: '#333', 
				borderBottom: '1px solid #333',
				paddingBottom: '10px'
			}}>
							Weather Summary
			</h2>
			<table style={{ 
				width: '100%', 
				borderCollapse: 'collapse' 
			}}>
				<thead>
					<tr>
						{tableHeaders.map(tableHeader => (
							<th key={tableHeader} style={{ 
								padding: '10px', 
								borderBottom: '1px solid #333', 
								textAlign: 'left',
								color: '#666', 
							}}>
								{tableHeader}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{
							tableHeaders.map(tableHeader => (
								<td key={tableHeader} style={{ 
									padding: '10px', 
									borderBottom: '1px solid #ccc' 
								}}>
									<div style={{
										cursor: 'pointer'
									}} onClick={() => onCellClick(tableHeader)}>
										<p style={{ 
											fontSize: '1rem', 
											color: '#666', 
											marginBottom: '10px' 
										}}>
											Day: {weatherData[tableHeader]?.dayOfWeek}
										</p>
										<p style={{ 
											fontSize: '1rem', 
											color: '#666', 
											marginBottom: '10px' 
										}}>
											Max Temp: {weatherData[tableHeader]?.maxTemperature}
										</p>
										<p style={{ 
											fontSize: '1rem', 
											color: '#666', 
											marginBottom: '10px' 
										}}>
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
	);
}
