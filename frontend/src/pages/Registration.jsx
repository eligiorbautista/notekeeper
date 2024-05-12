import { useState, useEffect } from 'react';
import { useNavigate, Link, Form } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_PREFERENCE } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import api from '../api';
import Loader from '../components/Loader';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const isEmailValid = (email) => {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isPasswordValid = (password) => {
        // Regular expression for validating password (minimum 8 characters, at least one letter, and one number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    const doPasswordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const validEmail = isEmailValid(username);
        const validPassword = isPasswordValid(password);
        const passwordsMatch = doPasswordsMatch(password, confirmPassword);

        if (!validEmail) {
            toast.error('Please enter a valid email address.', TOAST_PREFERENCE);
            return;
        }

        if (!validPassword) {
            toast.error('Password must be at least 8 characters long and contain both letters and numbers.', TOAST_PREFERENCE);
            return;
        }

        if (!passwordsMatch) {
            toast.error('Passwords do not match.', TOAST_PREFERENCE);
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/api/register/', { username: username, password: password }).then(() => { })
            toast.success('Hooray! You\'ve successfully registered.', TOAST_PREFERENCE);
        } catch (error) {
            if (error.response.status === 409) {
                toast.error('Email address is already registered. Please use a different one.', TOAST_PREFERENCE);
                console.error(error)
            } else {
                toast.error('Oops! Something went wrong. Please try again later.', TOAST_PREFERENCE);
                console.error(error)
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto " src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=400" alt="tail-wind-logo" />
                {loading && <Loader />}
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to NoteKeeper</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="email"
                                autoComplete="email"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" className="mt-6 flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Sign Up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <Link to={'/login'} className="font-semibold leading-6 text-gray-600 hover:text-gray-500 ml-1 text-sm ">Sign In</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Registration;