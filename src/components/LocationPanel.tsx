import { GeoLocationData } from '../helpers/utils';

export default function LocationPanel({ locationResult }: { locationResult: GeoLocationData}) {
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
							Location Summary
			</h2>
			<p style={{ 
				fontSize: '1rem', 
				color: '#666', 
				marginBottom: '10px'
			}}>
							Location Name: {locationResult.display_name}
			</p>
			<p style={{ 
				fontSize: '1rem', 
				color: '#666', 
				marginBottom: '10px'
			}}>
							Latitude: {locationResult.lat}
			</p>
			<p style={{ 
				fontSize: '1rem', 
				color: '#666', 
				marginBottom: '10px'
			}}>
							Longitude: {locationResult.lon}
			</p>
		</div>
	);
}
