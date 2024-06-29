import React, { useRef } from 'react'
import { useAuth } from '../AuthProvider'
import { Success } from '../Popup/Success'
import '../Withdraw/Withdraw.scss'

export const Withdraw = props => {
	const { increase, decrease } = useAuth()
	const ref = useRef()

	const handleIncrease = () => {
		const value = ref.current.value
		const amount = parseFloat(value)

		if (
			value === '' ||
			isNaN(amount) ||
			!/^\d+(\.\d+)?$/.test(value) ||
			parseFloat(value) < 0
		) {
			window.alert('Please enter a valid number')
			return
		}
		if (Number.isInteger(amount)) {
			increase(amount)
			props.open()
		} else {
			alert('Please enter a valid whole number')
		}
	}

	const handleDecrease = () => {
		const value = ref.current.value
		const amount = parseFloat(value)

		if (
			value === '' ||
			isNaN(amount) ||
			!/^\d+(\.\d+)?$/.test(value) ||
			parseFloat(value) < 0
		) {
			window.alert('Please enter a valid number')
			return
		}
		if (Number.isInteger(amount)) {
			decrease(amount)
			props.open()
		} else {
			alert('Please enter a valid whole number')
		}
	}

	return (
		<div>
			<div className='container'>
				<input ref={ref} type='text' placeholder='Amount' className='input' />
				<div className='buttons'>
					<button
						onClick={() => {
							handleIncrease()
						}}
						className='green'
					>
						Top-Up
					</button>
					<button
						onClick={() => {
							handleDecrease()
						}}
						className='purple'
					>
						Withdraw
					</button>
				</div>
			</div>
			{props.isOpen ? <Success close={props.close} /> : <></>}
		</div>
	)
}
