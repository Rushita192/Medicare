import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Authentication } from '../../auth/authentication';

const Header = () => {
	const history = useHistory();
	const logoutHandler = () => {
		Authentication.removeToken();
		window.location.reload();
		history.push('/login');
	};
	return (
		<>
			<Navbar expand='lg' className='header-background'>
				<Container>
					<Navbar.Brand>
						<img src='./image/logo.png' alt='logo' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Link className='mx-2' to={'/'}>
								Home
							</Link>
							{Authentication.getRole() === 'Nurse' ? (
								<>
									<Link className='mx-2' to={'/patient'}>
										Patient List
									</Link>
									<Link className='mx-2' to={'/emergency'}>
										Emergency
									</Link>
									<Link className='mx-2' to={'/add-quotes'}>
										Add Daily Tips
									</Link>
									<Link className='mx-2' to={'/add-vitals'}>
										Add Vitals
									</Link>
									<Link className='mx-2' to={'/view-vitals'}>
										View Vitals
									</Link>
									<Link className='mx-2' to={'/viewpatient'}>
										View Patient Status
									</Link>
								</>
							) : (
								<>
									<Link className='mx-2' to={'/view-quotes'}>
										Daily Tips
									</Link>
									<Link className='mx-2' to={'/motivation'}>
										Motivation Video
									</Link>

									<Link className='mx-2' to={'/add-emergency'}>
										Emergency
									</Link>

									<Link className='mx-2' to={'/add-status'}>
										Add Status
									</Link>

									<Link className='mx-2' to={'/view-status'}>
										View Status
									</Link>
								</>
							)}

							<Link className='mx-2' to={'/login'}>
								Login
							</Link>

							<Link className='mx-2' to={'/register'}>
								Register
							</Link>

							<p
								onClick={logoutHandler}
								style={{ cursor: 'pointer' }}
								className='logout mx-2 mb-0'
							>
								Logout
							</p>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
