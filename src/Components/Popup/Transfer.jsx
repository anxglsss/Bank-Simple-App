import React, { useState } from 'react'
import arrow from '../../assets/right-arrow (1).png'
import { useAuth } from '../AuthProvider'
import { Success } from '../Popup/Success'
import '../Popup/Transfer.scss'

export const Transfer = ({ onClose, selectedUser, isOpen, open, close }) => {
	const { updateBalance, user } = useAuth()
	const [amount, setAmount] = useState('')

	const handleTransfer = () => {
		if (user.balance < amount) {
			window.alert('Not enough')
			return
		}
		setTimeout(() => {
			onClose()
			setAmount('')
		}, 1)
		if (isNaN(amount) || amount <= 0) {
			alert('Please enter a valid amount')
			return
		}

		updateBalance(
			user.username,
			parseFloat(user.balance) - parseFloat(amount),
			{
				type: 'Transfer-Out',
				amount: amount,
				date: new Date().toLocaleDateString(),
				to: selectedUser.username,
			}
		)

		updateBalance(
			selectedUser.username,
			parseFloat(selectedUser.balance) + parseFloat(amount),
			{
				type: 'Transfer-In',
				amount: amount,
				date: new Date().toLocaleDateString(),
				to: selectedUser.username,
			}
		)
		open()
	}

	return (
		<div className='modal'>
			<div className='modal-content'>
				<span className='closee' onClick={onClose}>
					&times;
				</span>
				<h2 className='titlee'>Transfer</h2>
				<div className='underlinee'></div>
				<div className='transfer-info'>
					<h1 className='balanc'>Your Balance: ${!user ? '' : user.balance}</h1>
					<div className='user-info'>
						<img src={user.image} width='40' alt='' />
						<h2>{!user ? '' : user.username}</h2>
						<img src={arrow} width='40'></img>
						<img src={selectedUser.image} width='40' alt='' />
						<h2>{!selectedUser ? '' : selectedUser.username}</h2>
					</div>
					<div className='input-container'>
						<input
							type='text'
							placeholder='Amount'
							value={amount}
							onChange={e => setAmount(e.target.value)}
							className='inputt'
						/>
					</div>
					<button onClick={handleTransfer} className='transfer-button'>
						Transfer
					</button>
				</div>
			</div>
			{isOpen ? <Success close={close} /> : <></>}
		</div>
	)
}
