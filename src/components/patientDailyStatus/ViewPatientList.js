import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
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

const GET_DETAIL_BY_ID = gql`
	query patientStatusById($id: ID!) {
		patientStatusById(id: $id) {
			_id
			patientId
			pulserate
			bloodpressure
			weight
			temprature
			respiratory
			date
		}
	}
`;

const ViewPatientList = () => {
	const history = useHistory();
	const getUser = useQuery(GET_USERS);
	const [patient, setPatient] = useState('');
	const { data, refetch } = useQuery(GET_DETAIL_BY_ID, {
		variables: { id: patient },
	});

	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			toast.error('Login Now!!');
			history.push('/login');
		}
		if (getUser.data) {
			setUser(getUser.data.users);
		}
		getUser.refetch();
		refetch();
	}, [getUser, history, refetch]);

	const [users, setUser] = useState([]);
	const [vital, setVital] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Data Patient', data);
		if (patient) {
			setVital(data.patientStatusById);
		}
	};

	// if (loading)
	// 	return (
	// 		<Container className='my-3 py-3'>
	// 			<p>Loading...</p>
	// 		</Container>
	// 	);

	// if (error)
	// 	return (
	// 		<Container className='my-3 py-3'>
	// 			<p>Error :(</p>
	// 		</Container>
	// 	);
	return (
		<Container className='my-3 py-3'>
			<div>
				<Form className='my-3' onSubmit={handleSubmit} id='vital-form'>
					<Row>
						<Col md={6}>
							<Form.Label>Select Patient</Form.Label>
							<Form.Select
								className='mb-3'
								name='patient'
								onChange={(e) => setPatient(e.target.value)}
							>
								<option value=''>Select Patient</option>
								{users.map((user) => (
									<option key={user._id} value={user._id}>
										{`${user.fullname} - ${user._id}`}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={6} className='mt-2'>
							<Button variant='primary' className='px-5 mt-4' type='submit'>
								Submit Now
							</Button>
						</Col>
					</Row>
				</Form>
				<h4 className='text-center'>Patient Daily Status</h4>
				<Table responsive='sm' bordered>
					<thead className='bg-dark text-white'>
						<tr>
							<th>Patient Id</th>
							<th>Blood Pressure</th>
							<th>Pulse Rate</th>
							<th>Respiratory</th>
							<th>Temprature</th>
							<th>Weight</th>
						</tr>
					</thead>
					<tbody>
						{vital.map((vitalUser, index) => (
							<tr key={index}>
								<td>{vitalUser.patientId}</td>
								<td>{vitalUser.bloodpressure}</td>
								<td>{vitalUser.pulserate}</td>
								<td>{vitalUser.respiratory}</td>
								<td>{vitalUser.temprature}</td>
								<td>{vitalUser.weight}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Container>
	);
};

export default ViewPatientList;
