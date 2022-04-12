import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';

const ADD_EMERGENCY = gql`
	mutation emergencyDetails($message: String!) {
		emergencyDetails(message: $message) {
			id
			message
		}
	}
`;

const AddEmergencyData = () => {
	const history = useHistory();
	useEffect(() => {
		if (Authentication.getRole() !== 'Patient') {
			toast.error('Login Now!!');
			history.push('/login');
		}
	});
	const [message, setMessage] = useState('');

	const [emergencyDetails] = useMutation(ADD_EMERGENCY);
	const resetForm = () => {
		document.getElementById('emergency-form').reset();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (message === '') {
			toast.error('Enter Emergency Details!!');
		} else {
			emergencyDetails({
				variables: {
					message: message,
				},
			})
				.then(({ data }) => {
					// console.log('Data ', data);
					toast.success('Added Successfully!!');
					// clearState();
					resetForm();
				})
				.catch((error) => {
					toast.error(error.message);
				});
			// toast.success('Added Successfully!!');
			//resetForm();
		}
	};

	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 4, offset: 4 }} className='p-4 border'>
						<h4 className='text-center'>Emergency Details</h4>
						<Form className='my-5' onSubmit={handleSubmit} id='emergency-form'>
							<Form.Group className='mb-3'>
								<Form.Label>Emergency Details</Form.Label>
								<Form.Control
									as='textarea'
									rows={4}
									placeholder='Enter Details'
									name='message'
									onChange={(e) => setMessage(e.target.value)}
								/>
							</Form.Group>
							<div className='text-center'>
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

export default AddEmergencyData;
