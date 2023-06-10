import axios from 'axios';
import { format, getDay } from 'date-fns';
import parseForecast from './parseForecast';

export interface GeoLocationData {
  boundingbox: [string, string, string, string];
  category: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  place_id: number;
  place_rank: number;
  type: string;
}

export const getFirstGeoLocationData = async (search: string) => {
	const response = await axios.get<GeoLocationData[]>('https://nominatim.openstreetmap.org/search.php', {
		params: {
			q: search,
			polygon_geojson: 0,
			format: 'jsonv2',
		}
	});

	return response.data[0];
};

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

interface WeatherData {
	dayOfWeek: string;
  dewPointTemperature: number;
  endDate: string;
  floatingHourlyQpf: number;
  floatingProbabilityOfPrecipitation: number;
  gustWindSpeed: number | null;
  heatIndexTemperature: number;
  hourlyTemperature: number;
  relativeHumidity: number;
  startDate: string;
  sustainedWindSpeed: number;
  totalCloudAmount: number;
  windDirection: number;
}

// Define the type for the object.
type GroupedWeatherData = {
  [date: string]: WeatherData[];
}

interface DailyWeatherData {
  dayOfWeek: string;
  dewPointTemperature: number;
  endDate: string;
  floatingHourlyQpf: number;
  floatingProbabilityOfPrecipitation: number;
  gustWindSpeed: number | null;
  heatIndexTemperature: number;
  hourlyTemperature: number;
  maxTemperature: number;
  minTemperature: number;
  relativeHumidity: number;
  startDate: string;
  sustainedWindSpeed: number;
  totalCloudAmount: number;
  windDirection: number;
}

export type WeatherForecastData = {
  [date: string]: DailyWeatherData;
};

export const getWeatherForecastData = async (geoLocationData: GeoLocationData) => {
	const weatherData = await axios.get<string>('https://forecast.weather.gov/MapClick.php', {
		params: {
			lat: geoLocationData.lat,
			lon: geoLocationData.lon,
			FcstType: 'digitalDWML',
		}
	}).then(response => parseForecast(response.data));

	const formattedWeatherData = weatherData
		.map(({ startTime, endTime, ...rest }) => ({
			dayOfWeek: getDayOfWeek(startTime),
			startDate: format(startTime, 'd LLL'),
			endDate: format(endTime, 'd LLL'),
			...rest,
		})).reduce<GroupedWeatherData>((acc, data) => {
			if (acc[data.startDate]) {
				acc[data.startDate].push(data);
			} else {
				acc[data.startDate] = [data];
			}

			return acc;
		}, {});

	return Object.entries(formattedWeatherData).reduce<WeatherForecastData>((acc, [key, values]: [string, WeatherData[]]) => {
		const temps = values.map(({ hourlyTemperature }) => hourlyTemperature);
		const maxTemperature = Math.max(...temps);
		const minTemperature = Math.min(...temps);
    
		acc[key] = { 
			maxTemperature,
			minTemperature,
			...values[0],
		};
    
		return acc;
	}, {});
};