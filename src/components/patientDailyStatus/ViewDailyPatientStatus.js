import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Authentication } from '../../auth/authentication';
import { useHistory } from 'react-router-dom';

const GET_PATIENT_DETAIL_BY_ID = gql`
	{
		patientDailyStatusData {
			_id
			patientId
			bloodpressure
			pulserate
			weight
			temprature
			respiratory
			date
		}
	}
`;

// delete vital details schema define
const DELETE_PATIENT_DETAILS = gql`
	mutation deletePatientDailyStatus($id: ID!) {
		deletePatientDailyStatus(id: $id) {
			_id
			patientId
			bloodpressure
			pulserate
			weight
			temprature
			respiratory
			date
		}
	}
`;

const ViewDailyPatientStatus = () => {
	const history = useHistory();
	const { loading, error, data, refetch } = useQuery(GET_PATIENT_DETAIL_BY_ID);

	useEffect(() => {
		if (Authentication.getRole() !== 'Patient') {
			toast.error('Login Now!!');
			history.push('/login');
		}
		refetch();
	});
	// console.log('Data', data);
	const [deletePatientDailyStatus] = useMutation(DELETE_PATIENT_DETAILS);
	const handleDelete = async (id) => {
		const deleteData = await deletePatientDailyStatus({
			variables: { id: id },
		});
		if (deleteData) {
			toast.error('Patient Status Delete!!');
			refetch();
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
				<p>Error :(</p>
			</Container>
		);

	return (
		<Container className='my-3 py-3'>
			<h4 className='text-center'>Patient Daily Status Details</h4>
			<Table responsive='sm' bordered>
				<thead className='bg-dark text-white'>
					<tr>
						<th>Patient Id</th>
						<th>Blood Pressure</th>
						<th>Pulse Rate</th>
						<th>Respiratory</th>
						<th>Temprature</th>
						<th>Weight</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.patientDailyStatusData.map((patient, index) => (
						<tr key={index}>
							<td>{patient._id}</td>
							<td>{patient.bloodpressure}</td>
							<td>{patient.pulserate}</td>
							<td>{patient.respiratory}</td>
							<td>{patient.temprature}</td>
							<td>{patient.weight}</td>
							<td>
								<Link to={`/patient-status/${patient._id}`} className='mx-2'>
									<box-icon type='solid' name='edit'></box-icon>
								</Link>
								<box-icon
									className='delete-button'
									type='solid'
									name='trash'
									onClick={() => handleDelete(patient._id)}
								></box-icon>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default ViewDailyPatientStatus;
