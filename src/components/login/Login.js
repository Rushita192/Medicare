import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email
			token
			userType
		}
	}
`;

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (Authentication.getToken()) {
			history.push('/');
		}
	});

	const [login] = useMutation(LOGIN);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			toast.error('Please Fill All the Details!!');
		} else {
			login({
				variables: {
					email: email,
					password: password,
				},
			})
				.then(({ data }) => {
					//	console.log(data);
					if (data.login && data.login.token) {
						// console.log('Token ', data.login.token);
						Authentication.saveRole(data.login.userType);
						Authentication.saveToken(data.login.token);
						window.location.reload();
						history.push('/');
					}
				})
				.catch((error) => {
					toast.error(error.message);
				});
			// toast.success('Login Successfully!!');
		}
	};
	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 4, offset: 4 }} className='p-4 border'>
						<h4 className='text-center'>Login</h4>
						<p className='text-center'>Login to Access Dashboard</p>
						<Form className='my-5' onSubmit={handleSubmit}>
							<Form.Group className='mb-3'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter email'
									name='email'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<div className='text-center'>
								<Button variant='primary' className='px-5' type='submit'>
									Login Now
								</Button>
							</div>
							<div className='text-center'>
								<p className='mt-3 mb-2 text-primary'>Forgot Password?</p>
								<p className='mb-0'>
									Create a Account{' '}
									<Link to='/register' className='text-primary'>
										{' '}
										Sign Up
									</Link>
								</p>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
