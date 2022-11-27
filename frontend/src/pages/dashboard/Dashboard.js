import React from 'react';
import { redirect } from 'react-router-dom';
import UseRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';

const Dashboard = () => {
    UseRedirectLoggedOutUser("/login")
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}

export default Dashboard;
