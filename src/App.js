import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/navbar/Header';
import Login from './components/login/Login';
import UserList from './components/user/UserList';
import { Home } from './components/home/Home';
import Register from './components/register/Register';
import AddMotivation from './components/motivation/AddMotivation';
import AddVitalDetails from './components/vitaldetails/AddVitalDetails';
import ViewVitalDetails from './components/vitaldetails/ViewVitalDetails';
import ViewMotivation from './components/motivation/ViewMotivation';
import AddDailyPatientStatus from './components/patientDailyStatus/AddDailyPatientStatus';
import ViewDailyPatientStatus from './components/patientDailyStatus/ViewDailyPatientStatus';
import UpdateVitalDetails from './components/vitaldetails/UpdateVitalDetails';
import UpdatePatientStatus from './components/patientDailyStatus/UpdatePatientStatus';
import ViewPatientList from './components/patientDailyStatus/ViewPatientList';
import MotivationVideo from './components/motivation/MotivationVideo';
import AddEmergencyData from './components/emergency/AddEmergencyData';
import ViewEmergencyList from './components/emergency/ViewEmergencyList';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path='/' exact component={Home}></Route>
				<Route path='/login' exact component={Login}></Route>
				<Route path='/register' exact component={Register}></Route>
				<Route path='/patient' exact component={UserList}></Route>
				<Route path='/add-quotes' exact component={AddMotivation}></Route>
				<Route path='/view-quotes' exact component={ViewMotivation}></Route>
				<Route path='/add-vitals' exact component={AddVitalDetails}></Route>
				<Route path='/view-vitals' exact component={ViewVitalDetails}></Route>
				<Route path='/motivation' exact component={MotivationVideo}></Route>
				<Route path='/add-emergency' exact component={AddEmergencyData}></Route>
				<Route path='/emergency' exact component={ViewEmergencyList}></Route>
				<Route
					path='/update-vital/:id'
					exact
					component={UpdateVitalDetails}
				></Route>
				<Route
					path='/add-status'
					exact
					component={AddDailyPatientStatus}
				></Route>
				<Route path='/viewpatient' exact component={ViewPatientList}></Route>
				<Route
					path='/patient-status/:id'
					exact
					component={UpdatePatientStatus}
				></Route>
				<Route
					path='/view-status'
					exact
					component={ViewDailyPatientStatus}
				></Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
