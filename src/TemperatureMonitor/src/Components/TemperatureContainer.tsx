import React from 'react'
import { DescriptionContainer } from './DescriptionContainer'

interface TemperatureProps {
	temperature: number
	humidity: number
	lastTimeMeasured: string
}

const TemperatureContainer: React.FC<TemperatureProps> = ({
	temperature,
	humidity,
	lastTimeMeasured,
}) => {
	const getAirQualityEmoji = (
		temperature: number,
		humidity: number
	): string => {
		if (temperature > 30 && humidity > 70) {
			return '🤢'
		} else if (temperature > 30) {
			return '🥵'
		} else if (humidity > 70) {
			return '💦'
		} else if (humidity > 60) {
			return '💧'
		} else if (temperature < 18) {
			return '🥶'
		} else if (temperature >= 18 && temperature <= 22) {
			return '🙂'
		} else if (temperature > 22 && temperature <= 25) {
			return '😄'
		} else if (temperature > 25 && humidity < 50) {
			return '🌞'
		} else {
			return '😊'
		}
	}

	const getAdvice = (temperature: number, humidity: number): string => {
		if (temperature > 40 && humidity > 70) {
			return 'Congrats, you’re in an oven! Stay hydrated or you might melt.'
		} else if (temperature > 35) {
			return 'Is this a sauna? Turn on the fan, or you’ll fry like an egg.'
		} else if (temperature > 30) {
			return 'It’s so hot, even the air feels like a hairdryer. Stay cool!'
		} else if (temperature > 25 && humidity > 60) {
			return 'Welcome to the tropics! Sweat is your new best friend.'
		} else if (temperature > 25) {
			return 'Warm, but not too hot. Stay chill… or try!'
		} else if (temperature > 20) {
			return 'Perfect weather to relax… if you’re not a cold-weather fan.'
		} else if (temperature > 18) {
			return 'Just right! Time to shed the layers.'
		} else if (temperature < 18) {
			return 'Brrr! Break out the sweaters and complain.'
		} else if (temperature < 10) {
			return 'Cold enough for a snowman. Stay inside!'
		} else if (humidity > 70) {
			return 'It’s humid! Prepare for bad hair day.'
		} else if (humidity > 60) {
			return 'It’s humid, but not terrible… yet.'
		} else if (humidity < 50) {
			return 'Dry air! Don’t forget your lotion.'
		} else {
			return 'Low humidity, but your mood should be high!'
		}
	}

	const airQualityIcon = getAirQualityEmoji(temperature, humidity);
	const footerText = getAdvice(temperature,humidity);

	return (
		<div className='temperature-container'>
			<h2 className='title'>Room Monitoring</h2>
			<h1 className='temperature'>{temperature}°C</h1>
			<div className='divider'></div>
			<DescriptionContainer
				humidity={humidity.toString()}
				lastMeasurementTime={lastTimeMeasured}
				airQuality='Good'
				airQualityIcon={airQualityIcon}
				temperature={temperature}
			/>
			<p className='footer-text'>{footerText}</p>
		</div>
	)
}

export default TemperatureContainer
