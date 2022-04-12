import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// users schema declare
const GET_USERS = gql`
	{
		users {
			_id
			fullname
			email
			phone
			address
			city
			userType
		}
	}
`;

const UserList = () => {
	const history = useHistory();
	let { loading, error, data, refetch } = useQuery(GET_USERS);
	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			toast.error('Login Now!!');
			history.push('/login');
		}
		refetch();
	});

	if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Loading...</p>
			</Container>
		);

	if (error)
		return (
			<Container className='my-3 py-3'>
				<p>Error :(</p>
			</Container>
		);

	return (
		<Container className='my-3 py-3'>
			<h4 className='text-center'>Patient List</h4>
			<Table responsive='sm' bordered>
				<thead className='bg-dark text-white'>
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Address</th>
						<th>City</th>
					</tr>
				</thead>
				<tbody>
					{data.users.map((user, index) => (
						<tr key={index}>
							<td>{user.fullname}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>{user.address}</td>
							<td>{user.city}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default UserList;
