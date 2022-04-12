import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';

const GET_VITAL_BY_ID = gql`
	query vitalDetailsById($id: ID!) {
		vitalDetailsById(id: $id) {
			_id
			patient
			bodytemprature
			bloodpressure
			heartrate
			respiratory
		}
	}
`;

// update vital details schema
const UPDATE_VITALDETAILS = gql`
	mutation updateVitalDetail(
		$id: ID!
		$patient: ID!
		$bodytemprature: Float!
		$heartrate: Float!
		$bloodpressure: Float!
		$respiratory: Float!
	) {
		updateVitalDetail(
			id: $id
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

const InitialValue = {
	patient: '',
	bodytemprature: '',
	bloodpressure: '',
	heartrate: '',
	respiratory: '',
};

const UpdateVitalDetails = () => {
	const { id } = useParams();
	const history = useHistory();
	const { loading, error, data } = useQuery(GET_VITAL_BY_ID, {
		variables: { id },
	});
	useEffect(() => {
		if (!Authentication.getToken()) {
			history.push('/login');
			toast.success('Login First');
		}
		if (!id) {
			history.push('/');
		}
		if (data) {
			setPatient(data.vitalDetailsById);
		}
	}, [data, history, id]);

	const [patientDetails, setPatient] = useState(InitialValue);

	const { patient, bodytemprature, bloodpressure, heartrate, respiratory } =
		patientDetails;

	const [updateVitalDetail] = useMutation(UPDATE_VITALDETAILS);

	const onValueChange = (e) => {
		setPatient({ ...patientDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			patient === '' ||
			bodytemprature === '' ||
			bloodpressure === '' ||
			heartrate === '' ||
			respiratory === ''
		) {
			toast.error('Please Fill All the Details!!');
		} else {
			updateVitalDetail({
				variables: {
					id: id,
					patient: patient,
					bodytemprature: Number(bodytemprature),
					heartrate: Number(heartrate),
					bloodpressure: Number(bloodpressure),
					respiratory: Number(respiratory),
				},
			})
				.then((data) => {
					if (data) {
						toast.success('Vital Detail Updated !!');
						history.push('/view-vitals');
						// resetForm();
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
						<h4 className='text-center'>Update Vitals Details</h4>
						<p className='text-center'>Enter Vitals Details</p>
						<Form className='my-3' onSubmit={handleSubmit}>
							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Patient Id</Form.Label>
										<Form.Control
											type='text'
											placeholder='Patient Id'
											name='patient'
											value={patient}
											readOnly={true}
											onChange={(e) => onValueChange(e)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Body Temperature</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Body Temperature'
											name='bodytemprature'
											value={bodytemprature}
											onChange={(e) => onValueChange(e)}
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
											value={heartrate}
											onChange={(e) => onValueChange(e)}
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
											value={bloodpressure}
											onChange={(e) => onValueChange(e)}
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
											value={respiratory}
											onChange={(e) => onValueChange(e)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<div className='text-center mt-3'>
								<Button variant='primary' className='px-5' type='submit'>
									Update Now
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default UpdateVitalDetails;
