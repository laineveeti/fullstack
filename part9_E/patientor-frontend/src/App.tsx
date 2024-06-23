import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link,
    RouterProvider,
    createBrowserRouter,
    Outlet,
} from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import { PatientPage, loader as patientLoader } from './components/PatientPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();
    }, []);

    const Layout = () => {
        return (
            <div className='App'>
                <Container>
                    <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
                        Patientor
                    </Typography>
                    <Button
                        component={Link}
                        to='/'
                        variant='contained'
                        color='primary'
                    >
                        Home
                    </Button>
                    <Divider hidden />
                    <Outlet />
                </Container>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: (
                        <PatientListPage
                            patients={patients}
                            setPatients={setPatients}
                        />
                    ),
                },
                {
                    path: '/patients/:id',
                    element: <PatientPage />,
                    loader: patientLoader,
                    errorElement: <ErrorBoundary />,
                },
            ],
            errorElement: <ErrorBoundary />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
