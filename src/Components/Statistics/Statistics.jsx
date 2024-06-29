import Chart from 'chart.js/auto'
import React, { useEffect, useRef } from 'react'
import { useAuth } from '../AuthProvider'
import '../Statistics/Statistics.scss'

export const Statistics = () => {
	const { user } = useAuth()
	const chartRef = useRef(null)
	const chartInstanceRef = useRef(null)

	const calculateSums = () => {
		let income = 0
		let expense = 0

		if (user && user.operations) {
			user.operations.forEach(operation => {
				if (operation.type === 'Income') {
					income += parseFloat(operation.amount)
				} else if (operation.type === 'Expense') {
					expense += parseFloat(operation.amount)
				} else if (operation.type === 'Transfer-In') {
					income += parseFloat(operation.amount)
				} else if (operation.type === 'Transfer-Out') {
					expense += parseFloat(operation.amount)
				}
			})
		}

		return { income, expense }
	}

	const { income, expense } = calculateSums()

	useEffect(() => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.destroy()
		}
		const ctx = chartRef.current.getContext('2d')
		chartInstanceRef.current = new Chart(ctx, {
			type: 'pie',
			data: {
				datasets: [
					{
						data: [income, expense],
						backgroundColor: ['rgb(0, 234, 12)', 'rgb(145, 0, 241)'],
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false,
					},
				},
				elements: {
					arc: {
						borderWidth: 0,
					},
				},
			},
		})
	}, [income, expense])

	return (
		<div className='stat-main'>
			<div className='platform'>
				<canvas ref={chartRef} width='100' height='100'></canvas>
			</div>
			<div className='info-stat'>
				<div className='income'>Income : ${income.toFixed(2)}</div>
				<div className='expense'>Expense : ${expense.toFixed(2)}</div>
			</div>
		</div>
	)
}
