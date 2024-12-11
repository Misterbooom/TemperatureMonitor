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
	const [refreshKey, setRefreshKey] = useState(0) // Added state to trigger refresh

	const fetchData = () => {
		axios
			.get('http://127.0.0.1:5000/get_temperature')
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.error('Error fetching temperature data:', error)
			})
	}

	useEffect(() => {
		fetchData()
	}, [refreshKey])

	const handleRefreshClick = () => {
		setRefreshKey(prevKey => prevKey + 1) 
	}

	if (!data) {
		console.error('invalid data - ', data)
		return <p>Loading...</p>
	}

	return (
		<div className='App'>
			<TemperatureContainer
				temperature={data.temperature}
				lastTimeMeasured={data.lastTimeMeasured}
				humidity={data.humidity}
				onRefreshClick={handleRefreshClick} 
			/>
		</div>
	)
}

export default App
