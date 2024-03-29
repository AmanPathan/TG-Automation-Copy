import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    otp: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success('User Registered');
      const response = await axios.post('http://localhost:4000/api/v1/signup', formData);

      if (response) {
        setTimeout(() => {
          toast.dismiss();
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Something went wrong!');
    }
  };
  return (
    <div class="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <Toaster position="top-right" toastOptions={{ success: { duration: 3000 } }} />

      <div class="relative">
        <div class="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div class="flex-auto p-6">
            <div class="mb-4 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" class="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span class="flex-shrink-0 text-3xl p-1 font-black capitalize tracking-tight opacity-100">Signup</span>
              </a>
            </div>
            <p class="mb-6 text-gray-500 text-center">Use your Email ID and OTP sent on mail to signup</p>

            <form id="" class="mb-4" onSubmit={handleSubmit}>
              <div class="mb-4">
                <label for="name" class="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Name</label>
                <input type="text" class="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="name"  name="name" value={formData.name} onChange={handleChange} placeholder="Enter your email or username" autofocus="" />
              </div>
              <div class="mb-4">
                <label for="email" class="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                <input type="text" class="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email or username" autofocus="" />
              </div>
              <div class="mb-4">
                <div class="flex justify-between">
                  <label class="mb-2 inline-block text-xs font-medium uppercase text-gray-700" for="password">Password</label>
                  <a onClick={()=>{navigate('/forgetpassword')}} class="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                    <small class=" ">Forgot Password?</small>
                  </a>
                </div>
                <div class="relative flex w-full flex-wrap items-stretch">
                  <input type="password" id="password" class="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" value={formData.password} onChange={handleChange} placeholder="············" />
                </div>
              </div>

              <div class="mb-4">
                <label for="countries" class="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Role</label>
                <select id="countries" class="w-full rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"   name="role" value={formData.role} onChange={handleChange} >
                  <option selected>Select a Role</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student">Student</option>
                </select>              
              </div>

              <div class="mb-4">
                <label for="email" class="mb-2 inline-block text-xs font-medium uppercase text-gray-700">otp</label>
                <input type="text" class="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="otp" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter your email or username" autofocus="" />
              </div>

              <div class="mb-4">
                <button class="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Sign up</button>
              </div>
            </form>

            <p class="mb-4 text-center">
              New on TG Dashboard?
              <a class="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500" onClick={()=>{navigate('/sendotp')}}> Create an account </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup