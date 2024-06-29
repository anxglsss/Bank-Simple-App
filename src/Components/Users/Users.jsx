import React, { useState } from 'react'
import users from '../../assets/teamwork.png'
import { Transfer } from '../../Components/Popup/Transfer'
import { useAuth } from '../AuthProvider'
import '../Users/Users.scss'

export const Users = props => {
	const { getUsers, user } = useAuth()
	const [selectedUser, setSelectedUser] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = user => {
		setSelectedUser(user)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setSelectedUser(null)
		setIsModalOpen(false)
	}

	return (
		<div>
			<div className='cont'>
				<div className='title'>
					<h1 className='title-text'>All users</h1>
					<div className='underline'></div>
				</div>
				<div className='users-img'>
					<img src={users} width='35' alt='' />
				</div>
				<div className='list'>
					{getUsers().map((item, index) =>
						!user ? (
							<div key={index}></div>
						) : item.username === user.username ? (
							<React.Fragment key={index}></React.Fragment>
						) : (
							<div key={item.username} className='item'>
								{' '}
								{}
								<img
									src={item.image}
									onClick={() => openModal(item)}
									width='40'
									alt=''
								/>
								<h2>{item.username}</h2>
							</div>
						)
					)}
				</div>
			</div>
			{isModalOpen && (
				<Transfer
					selectedUser={selectedUser}
					onClose={closeModal}
					open={props.open}
					close={props.close}
					isOpen={props.isOpen}
				/>
			)}
		</div>
	)
}
