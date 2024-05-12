import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

/* Wrapper component for a protected route */
const AuthenticatedRoute = ({ children }) => {
    // State to track user authentication status
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

    useEffect(() => {
        // On component mount, validate the token
        validateToken().catch(() => setIsUserAuthenticated(false));
    }, []);

    // Function to refresh access token
    const refreshToken = async () => {
        // Retrieve refresh token from local storage
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        try {
            // Make a request to refresh the access token
            const res = await api.post("/api/token/refresh/", {
                refresh: refresh_token,
            });
            // If refresh is successful, update access token and set user authentication to true
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsUserAuthenticated(true);
            } else {
                // If refresh fails, set user authentication to false
                setIsUserAuthenticated(false);
            }
        } catch (error) {
            // If an error occurs during refresh, log the error and set user authentication to false
            console.error(error);
            setIsUserAuthenticated(false);
        }
    };

    // Function to validate access token
    const validateToken = async () => {
        // Retrieve access token from local storage
        const access_token = localStorage.getItem(ACCESS_TOKEN);

        if (!access_token) {
            // If access token is not present, set user authentication to false
            setIsUserAuthenticated(false);
            return;
        }
        // Decode the JWT token
        const jwt = jwtDecode(access_token);
        // Get the expiration time of the token
        const expiration = jwt.exp;
        // Get the current time
        const currentTime = Date.now() / 1000; // Divide by 1000 to get time in seconds

        if (expiration < currentTime) {
            // If token is expired, refresh it
            await refreshToken();
        } else {
            // If token is still valid, set user authentication to true
            setIsUserAuthenticated(true);
        }
    };

    // If user authentication status is still unknown (null), show loading message
    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If user is authenticated, render the children components 
    // If user is not authenticated, navigate to login page
    return isUserAuthenticated ? children : <Navigate to='/login' />;
};

export default AuthenticatedRoute; // Export the AuthenticatedRoute component
