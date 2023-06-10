import {XMLParser} from 'fast-xml-parser';
import {camelCase, pascalCase} from 'change-case';

export function parseToJsObj(xmlText: string) {
	const parseOptions = {
		ignoreAttributes: false,
		parseAttributeValue: true,
		attributesGroupName: '@',
		attributeNamePrefix: '',
	};

	const parser = new XMLParser(parseOptions);
	const jsObj = parser.parse(xmlText);

	return jsObj;
}

export function extractParameters(forecast: any) {
	const startTimes = forecast.dwml.data['time-layout']['start-valid-time'];
	const endTimes = forecast.dwml.data['time-layout']['end-valid-time'];
	const output = [];

	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < startTimes.length; index++) {
		output.push({
			startTime: new Date(startTimes[index]),
			endTime: new Date(endTimes[index]),
		});
	}

	// eslint-disable-next-line no-restricted-syntax
	for (const key in forecast.dwml.data.parameters) {
		if (key === 'weather' || key === '@')
			// eslint-disable-next-line no-continue
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
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						output[jj][metric] = null;
					} else {
						throw new Error('Unexpected element');
					}
				} else {
					// eslint-disable-next-line indent, @typescript-eslint/ban-ts-comment
            // @ts-ignore
					output[jj][metric] = measurement;
				}
			}
		}
	}

	return output;
}

export function parseForecast(xmlText: string) {
	const raw = parseToJsObj(xmlText);
	const nice = extractParameters(raw);
	return nice;
};


