import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Components/AuthProvider'
import { Home } from './pages/Home/Home'
import { Register } from './pages/Register/Register'

function App() {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Register />} />
					<Route path='/home' element={<Home />} />
				</Routes>
			</AuthProvider>
		</>
	)
}

export default App
