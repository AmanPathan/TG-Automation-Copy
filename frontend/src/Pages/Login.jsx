import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
// import { formatPostcssSourceMap } from 'vite';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/login', formData);
            if(response){
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className="h-screen flex-column items-center justify-center">
            <div className='mx-auto w-2/5 rounded-lg bg-black text-white'>
                <p className='my-3 text-center py-2 text-xl font-serif text-custom text-primary'>Login</p>
            </div>
            <form className="h-screen flex items-center justify-center w-screen" onSubmit={handleSubmit}>
                <div className='h-screen flex-column items-center justify-center w-3/12'>
                <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='email'>
                            Email:
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline'
                            id='email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password:
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            name='password'
                            type='text'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>

                    <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'>
                        Login
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Login;