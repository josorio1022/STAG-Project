/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import { XMLParser } from 'fast-xml-parser';
import { camelCase, pascalCase } from 'change-case';

const parseToJsObj = (xmlText: string) => {
	const parseOptions = {
		ignoreAttributes: false,
		parseAttributeValue: true,
		attributesGroupName: '@',
		attributeNamePrefix: '',
	};
	const parser = new XMLParser(parseOptions);
	const jsObj = parser.parse(xmlText);
	return jsObj;
};

const extractParameters = (forecast: any) => {
	const startTimes = forecast.dwml.data['time-layout']['start-valid-time'];
	const endTimes = forecast.dwml.data['time-layout']['end-valid-time'];
	const output = [];

	for (let index = 0; index < startTimes.length; index++) {
		output.push({
			startTime: new Date(startTimes[index]),
			endTime: new Date(endTimes[index]),
		});
	}

	for (const key in forecast.dwml.data.parameters) {
		if (key === 'weather' || key === '@')
			continue;

		const values1 = forecast.dwml.data.parameters[key];
		const values = Array.isArray(values1)
			? values1
			: [values1];

		const category = key;

		for (let ii = 0; ii < values.length; ii++) {
			const item = values[ii];
			const itemValues = item.value;
			const itemAttributes = item['@'];
			const p1 = camelCase(itemAttributes.type);
			const p2 = pascalCase(category);
			const metric = p1 + p2;

			for (let jj = 0; jj < itemValues.length; jj++) {
				const measurement = itemValues[jj];
				if (typeof measurement === 'object') {
					if (measurement['@']['xsi:nil']) {
						// @ts-ignore
						output[jj][metric] = null;
					} else {
						throw new Error('Unexpected element');
					}
				} else {
					// @ts-ignore
					output[jj][metric] = measurement;
				}
			}
		}
	}

	return output;
};

export interface ParseForecastOutput {
  dewPointTemperature: number;
  endTime: Date;
  floatingHourlyQpf: number;
  floatingProbabilityOfPrecipitation: number;
  gustWindSpeed: number | null;
  heatIndexTemperature: number;
  hourlyTemperature: number;
  relativeHumidity: number;
  startTime: Date;
  sustainedWindSpeed: number;
  totalCloudAmount: number;
  windDirection: number;
}

const parseForecast = (xmlText: string): ParseForecastOutput[] => {
	const raw = parseToJsObj(xmlText);
	const nice = extractParameters(raw);
	return nice as unknown as ParseForecastOutput[];
};

export default parseForecast;


