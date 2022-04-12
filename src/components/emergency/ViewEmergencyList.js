import React, { useEffect } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// motivation schema declare
const GET_EMERGENCY = gql`
	{
		emegencyList {
			message
			date
			patientId {
				fullname
				email
				address
				phone
				city
				id
			}
		}
	}
`;

const ViewEmergencyList = () => {
	const history = useHistory();
	const { loading, error, data, refetch } = useQuery(GET_EMERGENCY);
	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			toast.error('Login Now!!');
			history.push('/login');
		}
		refetch();
	});
	console.log('Data ', data);
	if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Loading...</p>
			</Container>
		);

	if (error)
		return (
			<Container className='my-3 py-3'>
				<p>Error Motivation :(</p>
			</Container>
		);
	return (
		<Container className='my-3 py-3'>
			<Row>
				<h4 className='text-center'>Patient List</h4>
				<Table responsive='sm' bordered>
					<thead className='bg-dark text-white'>
						<tr>
							<th>Patient Id</th>
							<th>FullName</th>
							<th>EMail</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Emergency Message</th>
							{/* <th>Date</th> */}
						</tr>
					</thead>
					<tbody>
						{data.emegencyList.map((emergency, index) => (
							<tr key={index}>
								<td>{emergency.patientId.id}</td>
								<td>{emergency.patientId.fullname}</td>
								<td>{emergency.patientId.email}</td>
								<td>{emergency.patientId.phone}</td>
								<td>
									{emergency.patientId.address},{emergency.patientId.city}
								</td>
								<td>{emergency.message}</td>
								{/* <td>{emergency.date}</td> */}
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default ViewEmergencyList;
