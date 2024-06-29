import React from 'react'
import date from '../../assets/calendar (1).png'
import dollar from '../../assets/dollar.png'
import money2 from '../../assets/money (2).png'
import money from '../../assets/money.png'
import money1 from '../../assets/profit.png'
import { useAuth } from '../AuthProvider'
import './Operations.scss'

export const Operations = () => {
	const { user, resetOperations } = useAuth()

	if (!user || !user.operations) {
		return <div>Loading...</div>
	}

	return (
		<div className='operations'>
			<div className='title-list'>
				<h1 className='text'>Recent Operations</h1>
				<button
					className='reset'
					onClick={() => {
						resetOperations()
					}}
				>
					Delete
				</button>
			</div>
			<div className='underline'></div>
			<div className='list'>
				{user.operations
					.slice()
					.reverse()
					.map((operation, index) => (
						<div className='item' key={index}>
							{operation.type == 'Income' ? (
								<div className='item'>
									<img className='income-img' src={money} width='30'></img>
									<h2 className='prop income-text'>{operation.type}</h2>
									<img className='date income-img' width='30' src={date}></img>
									<h3>{operation.date}</h3>
									<h2 className='sum'>${operation.amount}.0</h2>
								</div>
							) : operation.type == 'Expense' ? (
								<div className='item'>
									<img className='expense-img' src={dollar} width='30'></img>
									<h2 className='prop exp-text'>{operation.type}</h2>
									<img className='date ' width='30' src={date}></img>
									<h3>{operation.date}</h3>
									<h2 className='sum'>${operation.amount}.0</h2>
								</div>
							) : operation.type == 'Transfer-In' ? (
								<div className='item'>
									<img
										className='income-img yellow'
										src={money1}
										width='40'
										id='yellow'
									></img>
									<h2 className='prop income-text'>Income</h2>
									<img className='date income-img' width='30' src={date}></img>
									<h3>{operation.date}</h3>
									<h2 className='sum'>${operation.amount}.0</h2>
								</div>
							) : (
								<div className='item'>
									<img
										className='expense-img red'
										id='red'
										src={money2}
										width='30'
									></img>
									<h2 className='prop exp-text'>Expense</h2>
									<img className='date ' width='30' src={date}></img>
									<h3>{operation.date}</h3>
									<h2 className='sum'>${operation.amount}.0</h2>
								</div>
							)}
						</div>
					))}
			</div>
		</div>
	)
}
