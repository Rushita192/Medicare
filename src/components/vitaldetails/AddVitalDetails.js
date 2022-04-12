import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';

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

// add vital details schema
const ADD_VITALDETAILS = gql`
	mutation addVitalDetail(
		$patient: ID!
		$bodytemprature: Float!
		$heartrate: Float!
		$bloodpressure: Float!
		$respiratory: Float!
	) {
		addVitalDetail(
			patient: $patient
			bodytemprature: $bodytemprature
			heartrate: $heartrate
			bloodpressure: $bloodpressure
			respiratory: $respiratory
		) {
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

const AddVitalDetails = () => {
	let { loading, data, refetch } = useQuery(GET_USERS);
	const history = useHistory();
	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			history.push('/login');
			toast.error('Login First');
		}
		if (!Authentication.getToken()) {
			history.push('/login');
			toast.success('Login First');
		}
		refetch();
	});

	const [patient, setPatient] = useState('');
	const [bodyTemprature, setBodyTemprature] = useState('');
	const [heartRate, setHeartRate] = useState('');
	const [bloodPressure, setBloodPressure] = useState('');
	const [respiratory, setRespiratory] = useState('');

	const [addVitalDetail] = useMutation(ADD_VITALDETAILS);

	const resetForm = () => {
		document.getElementById('vital-form').reset();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			patient === '' ||
			bodyTemprature === '' ||
			heartRate === '' ||
			bloodPressure === '' ||
			respiratory === ''
		) {
			toast.error('Please Fill All the Details!!');
		} else {
			addVitalDetail({
				variables: {
					patient: patient,
					bodytemprature: Number(bodyTemprature),
					heartrate: Number(heartRate),
					bloodpressure: Number(bloodPressure),
					respiratory: Number(respiratory),
				},
			})
				.then((data) => {
					if (data) {
						toast.success('Data Inserted!!');
						resetForm();
					}
				})
				.catch((error) => {
					toast.error(error.message);
				});
			// clearState();
		}
	};

	if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Loading...</p>
			</Container>
		);

	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className='py-3 px-5 border'>
						<h4 className='text-center'>Vitals Details</h4>
						<p className='text-center'>Enter Vitals Details</p>
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
										{data.users.map((user) => (
											<option key={user._id} value={user._id}>
												{user.fullname}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Body Temperature</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Body Temperature'
											name='bodytemperature'
											onChange={(e) => setBodyTemprature(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Heart Rate</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Heart Rate'
											name='heartrate'
											onChange={(e) => setHeartRate(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Blood Pressure</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Blood Pressure'
											name='bloodpressure'
											onChange={(e) => setBloodPressure(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Respiratory Rate</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Respiratory Rate'
											name='respiratory'
											onChange={(e) => setRespiratory(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<div className='text-center mt-3'>
								<Button variant='primary' className='px-5' type='submit'>
									Submit Now
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddVitalDetails;
