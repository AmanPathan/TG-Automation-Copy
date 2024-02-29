import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { formatPostcssSourceMap } from 'vite';

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
    setFormData({ 
        ...formData, 
        [name]: value,
    });
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/v1/signup', formData);
        console.log(response.data);
    } catch(error){
        console.error('Signup failed:', error);
    }
   };

   return (
    <div className="flex justify-center items-center h-screen">
        <div className='mx-auto w-2/5 rounded-lg bg-black'>
            <p className='my-3 text-center py-2 text-xl font-serif text-custom text-primary'>Form</p>
        </div>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>


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
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
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

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
                Signup
            </button>
        </form>
    </div>
   );
};

export default SignupForm;