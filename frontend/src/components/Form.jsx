import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_PREFERENCE } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import api from '../api';
import '../styles/form.css';


const Form = ({ route, method }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formName = method === 'login' ? "Login" : "Register";
    const toastMessageSuccess = method === 'login' ? 'Welcome back! You are now logged in' : 'You\'re in! Registration successful.';
    const toastMessageError = method === 'login' ? 'Incorrect username or password. Please try again.' : 'Oops! Something went wrong. Please try again.';

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const res = await api.post(route, { username: email, password: password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                toast.success(toastMessageSuccess, TOAST_PREFERENCE);
            }

        } catch (error) {
            toast.error(toastMessageError, TOAST_PREFERENCE);
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    return (


        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">{formName} to NoteKeeper</h1>
            <input
                className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
            />
            <input
                className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />
            {method === 'register' && (
                <input
                    className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm Password"
                />
            )}
            {method === 'login' ? (
                <p>
                    Don't have an account yet?{' '}
                    <Link className="text-blue-500 hover:underline" to="/register">
                        Register
                    </Link>
                </p>
            ) : (
                <p>
                    Already have an account?{' '}
                    <Link className="text-blue-500 hover:underline" to="/login">
                        Login
                    </Link>
                </p>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                {formName}
            </button>
            <ToastContainer />
        </form>


    )
}

export default Form
