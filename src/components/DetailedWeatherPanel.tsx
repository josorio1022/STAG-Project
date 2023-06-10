import { format } from 'date-fns';
import { WeatherData } from '../helpers/utils';

interface DetailedWeatherPanelProps {
  weatherData: WeatherData[] | null;
}

export default function DetailedWeatherPanel({ weatherData }: DetailedWeatherPanelProps) {
	if (!weatherData) return null;

	const displayData = weatherData.map(({startTime, hourlyTemperature, floatingProbabilityOfPrecipitation}) => ({
		hour: format(startTime, 'pppp'),
		hourlyTemperature: `${hourlyTemperature} °F`,
		probabilityOfPrecipitation: `${floatingProbabilityOfPrecipitation}%`,
	}));

	return <div style={{
		marginTop: '10px'
	}}>
		<h2>Detailed Summary for {weatherData[0].dayOfWeek} {weatherData[0].startDate}</h2>
		<table>
			<thead>
				<tr>
					<th>Hour of the Day</th>
					<th>Forecast Temperature</th>
					<th>Probability of Precipitation</th>
				</tr>
			</thead>
			<tbody>
				{displayData.map((data) => (
					<tr key={data.hour}>
						<td>{data.hour}</td>
						<td>{data.hourlyTemperature}</td>
						<td>{data.probabilityOfPrecipitation.toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>;
}