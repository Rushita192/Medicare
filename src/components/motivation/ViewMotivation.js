import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// motivation schema declare
const GET_MOTIVATION = gql`
	{
		motivations {
			_id
			title
			content
			date
		}
	}
`;

const ViewMotivation = () => {
	const history = useHistory();
	const { loading, error, data, refetch } = useQuery(GET_MOTIVATION);
	useEffect(() => {
		if (Authentication.getRole() !== 'Patient') {
			toast.error('Login Now!!');
			history.push('/login');
		}
		refetch();
	});
	if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Loading...</p>
			</Container>
		);

	if (error)
		return (
			<Container className='my-3 py-3'>
				<p>Error Motivation :(</p>
			</Container>
		);

	return (
		<Container className='my-3 py-3'>
			<Row>
				<div className='d-flex justify-content-center'>
					{data.motivations.map((motivation, index) => (
						<div className='card-qoutes' key={index}>
							<div className='card-details-title'>
								<h3>{motivation.title}</h3>
							</div>
							<div className='card-details'>
								<i className='fas fa-quote-left'></i>
								<p>{motivation.content}</p>
							</div>
						</div>
					))}
				</div>
			</Row>
		</Container>
	);
};

export default ViewMotivation;
