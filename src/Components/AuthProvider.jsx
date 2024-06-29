import React, { createContext, useContext, useEffect, useState } from 'react'
import user2 from '../assets/man (1).png'
import user1 from '../assets/man.png'
import user3 from '../assets/profile.png'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState('')

	const increase = amount => {
		let newBalance = parseFloat(user.balance) + parseFloat(amount)
		const updatedUser = {
			...user,
			balance: newBalance,
			operations: [
				...user.operations,
				{
					type: 'Income',
					amount: amount,
					date: new Date().toLocaleDateString(),
				},
			],
		}
		setUser(updatedUser)
		localStorage.setItem('currentUser', JSON.stringify(updatedUser))
		updateUserInLocalStorage(updatedUser)
	}

	const decrease = amount => {
		if (parseFloat(user.balance) < parseFloat(amount)) {
			window.alert('Not enough balance')
			return
		}
		let newBalance = parseFloat(user.balance) - parseFloat(amount)
		const updatedUser = {
			...user,
			balance: newBalance,
			operations: [
				...user.operations,
				{
					type: 'Expense',
					amount: amount,
					date: new Date().toLocaleDateString(),
				},
			],
		}
		setUser(updatedUser)
		localStorage.setItem('currentUser', JSON.stringify(updatedUser))
		updateUserInLocalStorage(updatedUser)
	}

	const generateCard = () => {
		const firstDigits = '4432'
		let randomNumber = ''
		for (let i = 0; i < 16 - firstDigits.length; i++) {
			const digit = Math.floor(Math.random() * 10)
			randomNumber += digit
		}
		const formattedNumber =
			firstDigits + ` ${randomNumber.replace(/(.{4})/g, '$1 ')}`
		return formattedNumber
	}

	const generateDate = () => {
		const min = 2025
		const max = 2030
		const year = Math.floor(Math.random() * (max - min) + min)
		const month = Math.floor(Math.random() * 12) + 1
		return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`
	}

	const generateCvc = () => {
		return Math.floor(100 + Math.random() * 900)
	}

	const getRandomImage = () => {
		const images = [user1, user2, user3]
		return images[Math.floor(Math.random() * images.length)]
	}

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('currentUser'))
		if (storedUser) {
			setUser(storedUser)
		}
	}, [])

	const getUsers = () => JSON.parse(localStorage.getItem('users')) || []

	const saveUsers = users =>
		localStorage.setItem('users', JSON.stringify(users))

	const updateUserInLocalStorage = updatedUser => {
		const users = getUsers()
		const updatedUsers = users.map(user => {
			if (user.username === updatedUser.username) {
				return updatedUser
			}
			return user
		})
		saveUsers(updatedUsers)
	}

	const register = (username, password) => {
		const users = getUsers()
		const existingUser = users.find(user => user.username === username)

		if (existingUser) {
			window.alert('Already registered')
			return
		}

		const newUser = {
			username,
			password,
			balance: '0',
			operations: [],
			date: generateDate(),
			cvc: generateCvc(),
			cardNum: generateCard(),
			image: getRandomImage(),
		}
		users.push(newUser)
		saveUsers(users)
		localStorage.setItem('currentUser', JSON.stringify(newUser))
		setUser(newUser)
		return { success: true }
	}

	const login = (username, password) => {
		const users = getUsers()
		const existingUser = users.find(
			user => user.username === username && user.password === password
		)

		if (!existingUser) {
			window.alert('Wrong username or password')
			return
		}

		localStorage.setItem('currentUser', JSON.stringify(existingUser))
		setUser(existingUser)
		return { success: true }
	}

	const updateBalance = (username, newBalance, operation = null) => {
		const users = getUsers()
		const updatedUsers = users.map(userItem => {
			if (userItem.username === username) {
				const updatedUser = {
					...userItem,
					balance: parseFloat(newBalance),
					operations: operation
						? [...userItem.operations, operation]
						: userItem.operations,
				}
				if (user && user.username === username) {
					setUser(updatedUser)
				}
				return updatedUser
			}
			return userItem
		})
		saveUsers(updatedUsers)

		if (user && user.username === username) {
			localStorage.setItem(
				'currentUser',
				JSON.stringify({ ...user, balance: parseFloat(newBalance) })
			)
		}
	}

	const resetOperations = () => {
		const updatedUser = { ...user, operations: [] }
		setUser(updatedUser)
		localStorage.setItem('currentUser', JSON.stringify(updatedUser))
		updateUserInLocalStorage(updatedUser)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
				login,
				updateBalance,
				getUsers,
				increase,
				decrease,
				resetOperations,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
