import React, { useState } from 'react'
import card from '../../assets/credit-card (2).png'
import hide from '../../assets/eye (1).png'
import { useAuth } from '../AuthProvider'
import '../Card/Card.scss'

export const Card = () => {
	const [isHide, setIsHide] = useState(true)
	const { user } = useAuth()

	return (
		<>
			<div className='left'>
				<div className='bank-info'>
					<div className='bank-card'>
						<img src={card} width='40' alt='' className='card-img' />
						<div className='info-card'>
							<h1 className='card-text'>CARD NUMBER</h1>
							<h1 className='number'>{!user ? 'Loading...' : user.cardNum}</h1>
						</div>
					</div>
					<div className='date'>
						<h1 className='date-text'>EXPIRE DATE</h1>
						<h1 className='date-number'>{!user ? 'Loading...' : user.date}</h1>
					</div>
					<div className='cvc'>
						<h1 className='cvc-text'>CVC</h1>
						<div className='cvc-number'>
							{isHide ? <h1 className='dots'>•••</h1> : <h1>{user.cvc}</h1>}
							<img
								onClick={() => {
									setIsHide(!isHide)
								}}
								width='20'
								src={hide}
								alt=''
								className='eye'
							/>
						</div>
					</div>
					<div className='balance'>
						<h1 className='balance-text'>BALANCE</h1>
						<h1 className='balance-number'>
							{!user
								? 'Loading'
								: user.balance == 0
								? '$' + user.balance
								: '$' + user.balance}
							.00
						</h1>
					</div>
				</div>
			</div>
		</>
	)
}
