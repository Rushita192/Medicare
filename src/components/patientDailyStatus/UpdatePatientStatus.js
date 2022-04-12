import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';

const GET_PATIENT_STATUS_BY_ID = gql`
	query patientDailyStatusById($id: ID!) {
		patientDailyStatusById(id: $id) {
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

// update patient details status  schema
const UPDATE_PATIENT_DETAILS = gql`
	mutation updatePatientDailyStatus(
		$id: ID!
		$pulserate: Float!
		$bloodpressure: Float!
		$weight: Float!
		$temprature: Float!
		$respiratory: Float!
	) {
		updatePatientDailyStatus(
			id: $id
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

const InitialValue = {
	pulserate: '',
	bloodpressure: '',
	weight: '',
	temprature: '',
	respiratory: '',
};

const UpdatePatientStatus = () => {
	const { id } = useParams();
	const history = useHistory();
	const { loading, error, data } = useQuery(GET_PATIENT_STATUS_BY_ID, {
		variables: { id: id },
	});

	useEffect(() => {
		if (!Authentication.getToken()) {
			history.push('/login');
			toast.success('Login First');
		}
		if (!id) {
			history.push('/view-status');
		}
		if (data) {
			setPatient(data.patientDailyStatusById);
		}
	}, [data, history, id]);
	// console.log('Data', data);
	const [patientDetails, setPatient] = useState(InitialValue);

	const { pulserate, bloodpressure, weight, temprature, respiratory } =
		patientDetails;

	const onValueChange = (e) => {
		setPatient({ ...patientDetails, [e.target.name]: e.target.value });
	};

	const [updatePatientDailyStatus] = useMutation(UPDATE_PATIENT_DETAILS);

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
			updatePatientDailyStatus({
				variables: {
					id: id,
					pulserate: Number(pulserate),
					bloodpressure: Number(bloodpressure),
					weight: Number(weight),
					temprature: Number(temprature),
					respiratory: Number(respiratory),
				},
			})
				.then((data) => {
					if (data) {
						//	console.log('Data ', data);
						toast.success('Patient Status Updated!!');
						history.push('/view-status');
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

	if (error)
		return (
			<Container className='my-3 py-3'>
				<p>{`Error! ${error}`}</p>
			</Container>
		);

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
											value={respiratory}
											onChange={(e) => onValueChange(e)}
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
											value={temprature}
											onChange={(e) => onValueChange(e)}
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
											value={pulserate}
											onChange={(e) => onValueChange(e)}
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
											value={bloodpressure}
											onChange={(e) => onValueChange(e)}
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
											value={weight}
											onChange={(e) => onValueChange(e)}
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

export default UpdatePatientStatus;
