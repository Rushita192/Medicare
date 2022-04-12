import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const MotivationVideo = () => {
	const history = useHistory();
	useEffect(() => {
		if (Authentication.getRole() !== 'Patient') {
			toast.error('Login Now!!');
			history.push('/login');
		}
	});
	return (
		<Container className='my-3 py-3'>
			<Row>
				<Col md={4}>
					<div className='card m-2'>
					<iframe width="100%" height="250" src="https://www.youtube.com/embed/rUuAeto5Qe4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</Col>
				<Col md={4}>
					<div className='card m-2'>
					<iframe width="100%" height="250" src="https://www.youtube.com/embed/WwASmxrIEiI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</Col>
				<Col md={4}>
					<div className='card m-2'>
						<iframe width="100%"
							height="250"
							src="https://www.youtube.com/embed/irgaw4g_0JE"
							title="YouTube video player" 
							frameborder="0" 
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
							allowfullscreen>
						</iframe>
					</div>
				</Col>
				<Col md={4}>
					<div className='card m-2'>
					<iframe width="100%" height="250" src="https://www.youtube.com/embed/AM5MgWN5C8c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</Col>
				<Col md={4}>
					<div className='card m-2'>
					<iframe width="100%" height="250" src="https://www.youtube.com/embed/QOkFpAz_2PI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</Col>
				<Col md={4}>
					<div className='card'>
					<iframe width="100%" height="250" src="https://www.youtube.com/embed/dcJ9cTT6-zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default MotivationVideo;
