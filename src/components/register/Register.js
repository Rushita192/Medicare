import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import { useHistory } from 'react-router-dom';
// import { Authentication } from '../../auth/authentication';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
	mutation addUser(
		$fullname: String!
		$email: String!
		$phone: String!
		$password: String!
		$address: String!
		$city: String!
		$userType: String!
	) {
		addUser(
			fullname: $fullname
			email: $email
			phone: $phone
			password: $password
			address: $address
			city: $city
			userType: $userType
		) {
			fullname
			email
			phone
			password
			address
			city
			userType
		}
	}
`;

const Register = () => {
	// const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullname, setFullName] = useState('');
	const [phone, setPhone] = useState('');
	const [userType, setUserType] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');

	const [addUser] = useMutation(ADD_USER);

	// useEffect(() => {
	// 	if (Authentication.getToken()) {
	// 		history.push('/');
	// 	}
	// });

	const clearState = () => {
		setEmail('');
		setPassword('');
		setFullName('');
		setPhone('');
		setUserType('');
		setCity('');
		setAddress('');
	};

	const resetForm = () => {
		document.getElementById('registration-form').reset();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			email === '' ||
			password === '' ||
			fullname === '' ||
			phone === '' ||
			userType === '' ||
			city === '' ||
			address === ''
		) {
			toast.error('Please Fill All the Details!!');
		} else {
			addUser({
				variables: {
					fullname: fullname,
					email: email,
					phone: phone,
					password: password,
					address: address,
					city: city,
					userType: userType,
				},
			})
				.then(() => {
					toast.success('Register Successfully!!');
					clearState();
					resetForm();
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
	};
	// if (loading)
	// 	return (
	// 		<Container className='my-3 py-3'>
	// 			<p>Submitting...</p>
	// 		</Container>
	// 	);
	return (
		<div>
			<Container className='my-3 py-3'>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className='py-3 px-5 border'>
						<h4 className='text-center'>Register</h4>
						<p className='text-center'>Register to Access Dashboard</p>
						<Form
							className='my-3'
							onSubmit={handleSubmit}
							id='registration-form'
						>
							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Full Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Full Name'
											name='fullname'
											onChange={(e) => setFullName(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Email address</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter email'
											name='email'
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Phone'
											name='phone'
											onChange={(e) => setPhone(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											name='password'
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Enter Address</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter Address'
											name='address'
											onChange={(e) => setAddress(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className='mb-3'>
										<Form.Label>Enter City</Form.Label>
										<Form.Control
											type='text'
											placeholder='Enter City'
											name='city'
											onChange={(e) => setCity(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={6}>
									{['radio'].map((type) => (
										<div key={`inline-${type}`} className='mb-3'>
											<Form.Check
												inline
												label='Nurse'
												name='user'
												type={type}
												value='Nurse'
												onChange={(e) => setUserType(e.target.value)}
											/>
											<Form.Check
												inline
												label='Patient'
												name='user'
												type={type}
												value='Patient'
												onChange={(e) => setUserType(e.target.value)}
											/>
										</div>
									))}
								</Col>
							</Row>

							<div className='text-center mt-3'>
								<Button variant='primary' className='px-5' type='submit'>
									Register Now
								</Button>
							</div>
							<div className='text-center'>
								{/* <p className='mt-3 mb-2 text-primary'>Forgot Password?</p> */}
								<p className='mt-3 mb-2'>
									Already Have Account{' '}
									<Link to='/login' className='text-primary'>
										{' '}
										Sign In
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

export default Register;
