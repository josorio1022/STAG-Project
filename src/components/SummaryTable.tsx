import { WeatherForecastData } from '../helpers/utils';

export default function SummaryTable({ weatherData = {} }: { weatherData: WeatherForecastData }) {
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
	</div>;
};