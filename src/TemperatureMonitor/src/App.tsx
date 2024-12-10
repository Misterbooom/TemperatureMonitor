import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TemperatureContainer from './Components/TemperatureContainer'

// Тип данных, получаемых с API
interface Data {
	temperature: number
	humidity: number
	lastTimeMeasured: string
}

const App: React.FC = () => {
	const [data, setData] = useState<Data | null>(null)

	useEffect(() => {
		axios
			.get('http://127.0.0.1:5000/get_temperature')
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.error('Error fetching temperature data:', error)
			})
	}, [])

	if (!data) {
		console.error('invalid data - ', data)
		return <p>Loading...</p>
	}
	console.log(data);
	return (
		<div className='App'>
			<TemperatureContainer
				temperature={data.temperature}
				lastTimeMeasured={data.lastTimeMeasured}
				humidity={data.humidity}
			/>
		</div>
	)
}

export default App
