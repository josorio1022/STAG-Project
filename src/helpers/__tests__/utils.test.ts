import { describe, vi } from 'vitest';
import getGeoLocationData from './getGeoLocationData.fixture.json';
import getWeatherForecastDataFixture from './getWeatherForecastData.fixture.json';
import { GeoLocationData, getFirstGeoLocationData, getWeatherForecastData } from '../utils';

vi.mock('axios', () => ({
	default: {
		get: vi
			.fn()
			.mockResolvedValueOnce(getGeoLocationData)
			.mockResolvedValueOnce({data: getWeatherForecastDataFixture}),
	}
}));

describe('#getFirstGeoLocationData', () => {
	it('returns the first GeoLocationData', async () => {
		const result = await getFirstGeoLocationData('60614');
		expect(result).toEqual(getGeoLocationData.data[0]);
	});
});

describe('#getWeatherForecastData', () => {
	it('returns the weather forecast data', async () => {
		const result = await getWeatherForecastData({lat: '41.92', lon: '-87.65'} as GeoLocationData);

		expect(result).toEqual({
			'10 Jun': {
				maxTemperature: 75,
				minTemperature: 66,
				dayOfWeek: 'Saturday',
				startDate: '10 Jun',
				endDate: '10 Jun',
				dewPointTemperature: 45,
				heatIndexTemperature: 75,
				hourlyTemperature: 75,
				sustainedWindSpeed: 9,
				gustWindSpeed: null,
				totalCloudAmount: 52,
				floatingProbabilityOfPrecipitation: 0,
				relativeHumidity: 34,
				windDirection: 160,
				floatingHourlyQpf: 0
			},
			'11 Jun': {
				maxTemperature: 64,
				minTemperature: 54,
				dayOfWeek: 'Sunday',
				startDate: '11 Jun',
				endDate: '11 Jun',
				dewPointTemperature: 53,
				heatIndexTemperature: null,
				hourlyTemperature: 64,
				sustainedWindSpeed: 18,
				gustWindSpeed: 25,
				totalCloudAmount: 78,
				floatingProbabilityOfPrecipitation: 14,
				relativeHumidity: 67,
				windDirection: 340,
				floatingHourlyQpf: 0
			},
			'12 Jun': {
				maxTemperature: 72,
				minTemperature: 51,
				dayOfWeek: 'Monday',
				startDate: '12 Jun',
				endDate: '12 Jun',
				dewPointTemperature: 44,
				heatIndexTemperature: null,
				hourlyTemperature: 54,
				sustainedWindSpeed: 18,
				gustWindSpeed: 26,
				totalCloudAmount: 19,
				floatingProbabilityOfPrecipitation: 5,
				relativeHumidity: 69,
				windDirection: 0,
				floatingHourlyQpf: 0
			},
			'13 Jun': {
				maxTemperature: 78,
				minTemperature: 59,
				dayOfWeek: 'Tuesday',
				startDate: '13 Jun',
				endDate: '13 Jun',
				dewPointTemperature: 45,
				heatIndexTemperature: null,
				hourlyTemperature: 64,
				sustainedWindSpeed: 11,
				gustWindSpeed: 17,
				totalCloudAmount: 52,
				floatingProbabilityOfPrecipitation: 25,
				relativeHumidity: 50,
				windDirection: 270,
				floatingHourlyQpf: 0
			},
			'14 Jun': {
				maxTemperature: 68,
				minTemperature: 60,
				dayOfWeek: 'Wednesday',
				startDate: '14 Jun',
				endDate: '14 Jun',
				dewPointTemperature: 52,
				heatIndexTemperature: null,
				hourlyTemperature: 64,
				sustainedWindSpeed: 9,
				gustWindSpeed: 15,
				totalCloudAmount: 29,
				floatingProbabilityOfPrecipitation: 7,
				relativeHumidity: 65,
				windDirection: 280,
				floatingHourlyQpf: null
			},
			'15 Jun': {
				maxTemperature: 68,
				minTemperature: 61,
				dayOfWeek: 'Thursday',
				startDate: '15 Jun',
				endDate: '15 Jun',
				dewPointTemperature: 50,
				heatIndexTemperature: null,
				hourlyTemperature: 64,
				sustainedWindSpeed: 7,
				gustWindSpeed: null,
				totalCloudAmount: 25,
				floatingProbabilityOfPrecipitation: 11,
				relativeHumidity: 60,
				windDirection: 320,
				floatingHourlyQpf: null
			},
			'16 Jun': {
				maxTemperature: 67,
				minTemperature: 59,
				dayOfWeek: 'Friday',
				startDate: '16 Jun',
				endDate: '16 Jun',
				dewPointTemperature: 51,
				heatIndexTemperature: null,
				hourlyTemperature: 61,
				sustainedWindSpeed: 10,
				gustWindSpeed: 17,
				totalCloudAmount: 21,
				floatingProbabilityOfPrecipitation: 9,
				relativeHumidity: 70,
				windDirection: 20,
				floatingHourlyQpf: null
			},
			'17 Jun': {
				maxTemperature: 68,
				minTemperature: 60,
				dayOfWeek: 'Saturday',
				startDate: '17 Jun',
				endDate: '17 Jun',
				dewPointTemperature: 52,
				heatIndexTemperature: null,
				hourlyTemperature: 62,
				sustainedWindSpeed: 9,
				gustWindSpeed: 15,
				totalCloudAmount: 30,
				floatingProbabilityOfPrecipitation: 24,
				relativeHumidity: 70,
				windDirection: 40,
				floatingHourlyQpf: null
			}
		});
	});
});