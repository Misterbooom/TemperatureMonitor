import React from 'react'

interface DescriptionContainerProps {
	humidity: string
	lastMeasurementTime: string
	airQuality: string
	airQualityIcon: string
	temperature: number
}

const getTemperatureIcon = (temperature: number): string => {
	
	if (temperature < 5) {
		return '/src/image/0.png' 
	} else if (temperature >= 5 && temperature < 10) {
		return '/src/image/1.png' 
	} else if (temperature >= 10 && temperature < 15) {
		return '/src/image/2.png' 
	} else if (temperature >= 15 && temperature < 20) {
		return '/src/image/3.png' 
	} else if (temperature >= 20 && temperature < 25) {
		return '/src/image/5.png' 
	} else if (temperature >= 25 && temperature < 30) {
		return '/src/image/5.png' 
	} else if (temperature >= 30 && temperature < 35) {
		return '/src/image/6.png' 
	} else if (temperature >= 35 && temperature < 40) {
		return '/src/image/7.png' 
	} else if (temperature >= 40 && temperature < 45) {
		return '/src/image/8.png' 
	} else if (temperature >= 45 && temperature < 50) {
		return '/src/image/9.png' 
	} else {
		return '/src/image/10.png' 
	}
}

export const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
	humidity,
	lastMeasurementTime,
	airQualityIcon,
	temperature,
}) => {
	
	const temperatureIcon = getTemperatureIcon(temperature)

	return (
		<div className='description-container'>
			<img
				src={temperatureIcon} 
				alt='Temperature Icon'
				className='temperature-icon'
			/>
			<div className='info'>
				<h2 className='humidity'>Humidity: {humidity}</h2>
				<h2 className='time'>
					The last measurement time: {lastMeasurementTime}
				</h2>
			</div>
			<div className='air-quality'>
				<span
					className='air-quality-icon'
					role='img'
					aria-label='Good air quality'>
					{airQualityIcon}
				</span>
			</div>
		</div>
	)
}
