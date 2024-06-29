import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/AuthProvider'
import '../Register/Register.scss'

export const Register = () => {
	const navigate = useNavigate()
	const [isRegister, setIsRegister] = useState(true)
	const [fadeClass, setFadeClass] = useState('')
	const { register, login } = useAuth()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		setFadeClass('fadeIn')
		const timer = setTimeout(() => setFadeClass(''), 1000)
		return () => clearTimeout(timer)
	}, [isRegister])

	const handleSubmit = () => {
		if (username.length < 3) {
			window.alert('Username must be at least 3 characters')
			return
		}
		if (password.length < 6) {
			window.alert('Password must be at least 6 characters')
			return
		}
		setError('')
		const result = isRegister
			? register(username, password)
			: login(username, password)
		if (result.error) {
			setError(result.error)
		} else {
			navigate('/home')
		}
	}

	return (
		<div className='main'>
			<div className={`card ${fadeClass}`}>
				<h1 className='title'>{isRegister ? 'Register' : 'Login'}</h1>
				<div className='underline'></div>
				<div className='form'>
					<input
						type='text'
						placeholder='Name'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button onClick={handleSubmit} className='reg'>
					{isRegister ? 'Register' : 'Login'}
				</button>
				<p>
					{isRegister ? 'Already have an account?' : 'Create account?'}{' '}
					<span onClick={() => setIsRegister(!isRegister)}>
						{isRegister ? 'Log in' : 'Click here'}
					</span>
				</p>
				{error && <p className='error'>{error}</p>}
			</div>
		</div>
	)
}
