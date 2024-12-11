import React from 'react'
interface MyButtonProps {
	onClick: () => void 
}
export const RefreshButton: React.FC<MyButtonProps> = ({onClick}) => {
	return (
		<div>
			<button className='refresh-button' onClick={onClick}>
				<i className='fa fa-refresh' aria-hidden='true'></i>
			</button>
		</div>
	)
}
