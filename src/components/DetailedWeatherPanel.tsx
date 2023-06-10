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

	return (
		<div style={{ 
			backgroundColor: '#fff', 
			padding: '20px', 
			borderRadius: '10px', 
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
			margin: '20px 0', 
			width: '100%',
			overflowX: 'auto' 
		}}>
			<h2 style={{ 
				color: '#333', 
				borderBottom: '1px solid #333',
				paddingBottom: '10px'
			}}>
							Detailed Summary for {weatherData[0].dayOfWeek} {weatherData[0].startDate}
			</h2>
			<table style={{ 
				width: '100%', 
				minWidth: '600px', 
				borderCollapse: 'collapse' 
			}}>
				<thead>
					<tr>
						<th style={{ 
							padding: '10px', 
							borderBottom: '1px solid #333', 
							textAlign: 'left'
						}}>
													Hour of the Day
						</th>
						<th style={{ 
							padding: '10px', 
							borderBottom: '1px solid #333', 
							textAlign: 'left'
						}}>
													Forecast Temperature
						</th>
						<th style={{ 
							padding: '10px', 
							borderBottom: '1px solid #333', 
							textAlign: 'left'
						}}>
													Probability of Precipitation
						</th>
					</tr>
				</thead>
				<tbody>
					{displayData.map((data) => (
						<tr key={data.hour}>
							<td style={{ 
								padding: '10px', 
								borderBottom: '1px solid #ccc' 
							}}>
								{data.hour}
							</td>
							<td style={{ 
								padding: '10px', 
								borderBottom: '1px solid #ccc' 
							}}>
								{data.hourlyTemperature}
							</td>
							<td style={{ 
								padding: '10px', 
								borderBottom: '1px solid #ccc' 
							}}>
								{data.probabilityOfPrecipitation.toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
