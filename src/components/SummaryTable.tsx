/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { WeatherForecastData } from '../helpers/utils';

export default function SummaryTable({ weatherData = {}, onCellClick }: { weatherData: WeatherForecastData, onCellClick: (date: string) => void }) {
	const tableHeaders = Object.keys(weatherData);

	return 	<div>
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
								<div style={{
									cursor: 'pointer'
								}} onClick={() => onCellClick(tableHeader)}>
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
	</div>;
};