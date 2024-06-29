import React, { useEffect } from 'react'
import dollar from '../../assets/money (1).png'
import '../Popup/Success.scss'

export const Success = props => {
	useEffect(() => {
		const timer = setTimeout(() => {
			props.close()
		}, 2000)

		return () => clearTimeout(timer)
	}, [props])

	return (
		<div className={`success-cont ${props.isHidden ? 'hide' : ''}`}>
			<div
				className='onclose'
				onClick={() => {
					props.close()
				}}
			>
				&times;
			</div>
			<div className='success-info'>
				<img src={dollar} width='50' alt='' className='success' />
				<h2 className='complete'>Successfully Completed</h2>
			</div>
			<div className='line'></div>
		</div>
	)
}
