import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logout from '../../assets/logout2.png'
import search from '../../assets/search (2).png'
import { useAuth } from '../AuthProvider'
import '../Navbar/Navbar.scss'
import { Transfer } from '../Popup/Transfer'

export const Navbar = () => {
	const { user, getUsers } = useAuth()
	const navigate = useNavigate()

	const [searchQuery, setSearchQuery] = useState('')
	const [filteredUsers, setFilteredUsers] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)

	useEffect(() => {
		if (searchQuery.length > 0) {
			const users = getUsers()
			const filtered = users.filter(u =>
				u.username.toLowerCase().includes(searchQuery.toLowerCase())
			)
			setFilteredUsers(filtered)
		} else {
			setFilteredUsers([])
		}
	}, [searchQuery, getUsers])

	const handleSearchChange = e => {
		setSearchQuery(e.target.value)
	}

	const handleUserClick = user => {
		setSelectedUser(user)
		setShowModal(true)
	}

	return (
		<div>
			<div className='wrapper'>
				<div className='navbar'>
					<h1 className='title'>REXY BANK</h1>
					<div className='search'>
						<img
							width='23'
							height='23'
							src={search}
							className='search'
							alt='search-icon'
						/>
						<input
							type='text'
							placeholder='Search'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						{filteredUsers.length > 0 && (
							<div className='dropdown'>
								{filteredUsers.map(u => (
									<div
										key={u.username}
										className='dropdown-item'
										onClick={() => handleUserClick(u)}
									>
										{u.username}
									</div>
								))}
							</div>
						)}
					</div>
					<div className='account'>
						{user && (
							<img
								width='35'
								src={user.image}
								alt='user-icon'
								className='user'
							/>
						)}
						<p className='username'>{!user ? 'Loading' : user.username}</p>
					</div>
					<img
						onClick={() => {
							navigate('/')
						}}
						width='34'
						height='34'
						src={logout}
						className='logout'
						alt='logout-icon'
					/>
				</div>
				<div className='under'></div>
			</div>
			{showModal && selectedUser && (
				<Transfer
					selectedUser={selectedUser}
					onClose={() => setShowModal(false)}
				/>
			)}
		</div>
	)
}
