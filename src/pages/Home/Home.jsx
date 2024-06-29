import React, { useState } from 'react'
import { Card } from '../../Components/Card/Card'
import { Navbar } from '../../Components/Navbar/Navbar'
import { Operations } from '../../Components/Operations/Operations'
import { Statistics } from '../../Components/Statistics/Statistics'
import { Users } from '../../Components/Users/Users'
import { Withdraw } from '../../Components/Withdraw/Withdraw'
export const Home = () => {
	const [successWindow, setSuccessWindow] = useState(false)
	const open = () => {
		setSuccessWindow(true)
	}
	const close = () => {
		setSuccessWindow(false)
	}

	return (
		<div>
			<Navbar />
			<Card />
			<Statistics />
			<Operations />
			<Withdraw open={open} close={close} isOpen={successWindow} />
			<Users open={open} close={close} isOpen={successWindow} />
		</div>
	)
}
