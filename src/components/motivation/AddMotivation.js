import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';

const ADD_MOTIVATION = gql`
	mutation addMotivation($title: String!, $content: String!) {
		addMotivation(title: $title, content: $content) {
			_id
			title
			content
			date
		}
	}
`;

const AddMotivation = () => {
	const history = useHistory();
	useEffect(() => {
		if (Authentication.getRole() !== 'Nurse') {
			toast.error('Login Now!!');
			history.push('/login');
		}
	});
	const [title, setTitle] = useState('');
	const [quotes, setQuotes] = useState('');

	const [addMotivation] = useMutation(ADD_MOTIVATION);
	const resetForm = () => {
		document.getElementById('motivation-form').reset();
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (title === '' || quotes === '') {
			toast.error('Please Fill All the Details!!');
		} else {
			addMotivation({
				variables: {
					title: title,
					content: quotes,
				},
			})
				.then(({ data }) => {
					console.log('Data ', data);
					toast.success('Motivation Added');
					// clearState();
					resetForm();
				})
				.catch((error) => {
					toast.error(error.message);
				});
			// toast.success('Add Quotes!!');
		}
	};

	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 4, offset: 4 }} className='p-4 border'>
						<h4 className='text-center'>Dailt Tips Details</h4>
						<Form className='my-5' onSubmit={handleSubmit} id='motivation-form'>
							<Form.Group className='mb-3'>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter Title'
									name='title'
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Quotes</Form.Label>
								<Form.Control
									as='textarea'
									rows={4}
									placeholder='Enter Quotes'
									name='qoutes'
									onChange={(e) => setQuotes(e.target.value)}
								/>
							</Form.Group>
							<div className='text-center'>
								<Button variant='primary' className='px-5' type='submit'>
									Add Quotes
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddMotivation;
