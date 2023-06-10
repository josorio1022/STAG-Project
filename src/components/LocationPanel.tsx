import { GeoLocationData } from '../helpers/utils';

export default function LocationPanel({ locationResult }: { locationResult: GeoLocationData}) {
	return <div>
		<h2>Location Summary</h2>
		<p>Location Name: {locationResult.display_name}</p>
		<p>Latitude: {locationResult.lat}</p>
		<p>Longitude: {locationResult.lon}</p>
	</div>;
}