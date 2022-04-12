import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// add patient details status  schema
const ADD_PATIENT_DETAILS = gql`
	mutation addPatientDailyStatus(
		$pulserate: Float!
		$bloodpressure: Float!
		$weight: Float!
		$temprature: Float!
		$respiratory: Float!
	) {
		addPatientDailyStatus(
			pulserate: $pulserate
			bloodpressure: $bloodpressure
			weight: $weight
			temprature: $temprature
			respiratory: $respiratory
		) {
			_id
			patientId
			pulserate
			bloodpressure
			weight
			temprature
			respiratory
		}
	}
`;

const AddDailyPatientStatus = () => {
	const history = useHistory();
	useEffect(() => {
		if (Authentication.getRole() !== 'Patient') {
			toast.error('Login Now!!');
			history.push('/login');
		}
	});
	const [pulserate, setPulseRate] = useState('');
	const [bloodpressure, setBloodPressure] = useState('');
	const [weight, setWeight] = useState('');
	const [temprature, setTemprature] = useState('');
	const [respiratory, setRespiratory] = useState('');

	const [addPatientDailyStatus] = useMutation(ADD_PATIENT_DETAILS);

	const resetForm = () => {
		document.getElementById('patient-form').reset();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			pulserate === '' ||
			bloodpressure === '' ||
			weight === '' ||
			temprature === '' ||
			respiratory === ''
		) {
			toast.error('Please Fill All the Details!!');
		} else {
			addPatientDailyStatus({
				variables: {
					pulserate: Number(pulserate),
					bloodpressure: Number(bloodpressure),
					weight: Number(weight),
					temprature: Number(temprature),
					respiratory: Number(respiratory),
				},
			})
				.then((data) => {
					if (data) {
						// console.log('Data ', data);
						toast.success('Patient Status Added!!');
						resetForm();
					}
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
	};

	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className='py-3 px-5 border'>
						<h4 className='text-center'>Enter Daily Status</h4>
						<p className='text-center'>Enter Your Daily Status</p>
						<Form className='my-3' onSubmit={handleSubmit} id='patient-form'>
							<Row>
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
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Temprature</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Temprature'
											name='temprature'
											onChange={(e) => setTemprature(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Pulse Rate</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Pulse Rate'
											name='pulserate'
											onChange={(e) => setPulseRate(e.target.value)}
										/>
									</Form.Group>
								</Col>
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
							</Row>

							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Weight</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Weight'
											name='weight'
											onChange={(e) => setWeight(e.target.value)}
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

export default AddDailyPatientStatus;
