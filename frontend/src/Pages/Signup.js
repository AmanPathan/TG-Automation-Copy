import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
// import { formatPostcssSourceMap } from 'vite';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        designation: '',
        role: '',
        subjects: '',
        rollNumber: '',
        batch: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/signup', formData);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <div className="h-screen flex-column items-center justify-center">
            <div className='mx-auto w-2/5 rounded-lg bg-black text-white'>
                <p className='my-3 text-center py-2 text-xl font-serif text-custom text-primary'>Signup</p>
            </div>
            <form className="h-screen flex items-center justify-center w-screen" onSubmit={handleSubmit}>
                <div className='h-screen flex-column items-center justify-center w-3/12'>


                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name of User:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
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
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='department'>
                            Department:
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='department'
                            type='text'
                            name='department'
                            value={formData.department}
                            onChange={handleChange}
                            placeholder='Department'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='designation'>
                            Designation:
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='designation'
                            type='text'
                            name='designation'
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder='Designation'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='role'>
                            Role:
                        </label>
                        <select
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            required>
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'>
                        Signup
                    </button>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-black-300'>Already a member?</p>
                        <button className='text-white font-bold text-black' onClick={() => { navigate('/login') }}>
                            login
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default SignupForm;