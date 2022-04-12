import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';
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

const GET_VITAL_DETAIL_BY_ID = gql`
	query vitalDetailsByPatientId($id: ID!) {
		vitalDetailsByPatientId(id: $id) {
			_id
			patient
			bodytemprature
			heartrate
			bloodpressure
			respiratory
			date
		}
	}
`;

// delete vital details schema define
// const DELETE_VITAL_DETAILS = gql`
// 	mutation deleteVitalDetails($id: ID!) {
// 		deleteVitalDetails(id: $id) {
// 			_id
// 			patient
// 			bodytemprature
// 			heartrate
// 			respiratory
// 			date
// 		}
// 	}
// `;

const ViewVitalDetails = () => {
	const history = useHistory();
	const getUser = useQuery(GET_USERS);
	const [patient, setPatient] = useState('');
	const { data, refetch } = useQuery(GET_VITAL_DETAIL_BY_ID, {
		variables: { id: patient },
	});

	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			history.push('/login');
			toast.error('Login First');
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
		if (patient) {
			setVital(data.vitalDetailsByPatientId);
		}
	};

	// const [deleteVitalDetails] = useMutation(DELETE_VITAL_DETAILS);
	// const handleDelete = async (id) => {
	// 	const deleteData = await deleteVitalDetails({ variables: { id: id } });
	// 	if (deleteData) {
	// 		toast.error('Delete Vital Details!!');
	// 		refetch();
	// 	}
	// };

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
										{user.fullname}
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
				<h4 className='text-center'>Patient Vital Details</h4>
				<Table responsive='sm' bordered>
					<thead className='bg-dark text-white'>
						<tr>
							<th>Patient Id</th>
							<th>Body Temprature</th>
							<th>Heart Rate</th>
							<th>Blood Pressure</th>
							<th>Respiratory</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{vital.map((vitalUser, index) => (
							<tr key={index}>
								<td>{vitalUser.patient}</td>
								<td>{vitalUser.bodytemprature}</td>
								<td>{vitalUser.heartrate}</td>
								<td>{vitalUser.bloodpressure}</td>
								<td>{vitalUser.respiratory}</td>
								<td>
									<Link to={`/update-vital/${vitalUser._id}`} className='mx-2'>
										<box-icon type='solid' name='edit'></box-icon>
									</Link>
									{/* <box-icon
										className='delete-button'
										type='solid'
										name='trash'
										onClick={() => handleDelete(vitalUser._id)}
									></box-icon> */}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Container>
	);
};

export default ViewVitalDetails;
