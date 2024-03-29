import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      toast.success('Login Successfull');
      const response = await axios.post('http://localhost:4000/api/v1/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (response) {
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload();
          toast.dismiss();
        }, 1000);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.dismiss();
      toast.error('Something went wrong!');
    }
  };
  return (
    <div class="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <Toaster position="top-right" toastOptions={{ success: { duration: 3000 } }} />

      <div class="relative">

        {/* <div class="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
        </div>
        <div class="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
        </div> */}
        <div class="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div class="flex-auto p-6">
            <div class="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" class="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span class="flex-shrink-0 text-3xl font-black capitalize tracking-tight opacity-100">TG Dashboard</span>
              </a>
            </div>
            <h4 class="mb-2 font-medium text-center text-gray-700 xl:text-xl">Welcome to TG Dashboard</h4>
            <p class="mb-6 text-gray-500 text-center">Please sign-in to access your account</p>

            <form id="" class="mb-4" onSubmit={handleSubmit}>
              <div class="mb-4">
                <label for="email" class="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                <input type="text" class="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email"  name="email" value={formData.email} onChange={handleChange}  placeholder="Enter your email or username" autofocus="" />
              </div>
              <div class="mb-4">
                <div class="flex justify-between">
                  <label class="mb-2 inline-block text-xs font-medium uppercase text-gray-700" for="password">Password</label>
                  <a onClick={()=>{navigate('/forgetpassword')}} class="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                    <small class=" ">Forgot Password?</small>
                  </a>
                </div>
                <div class="relative flex w-full flex-wrap items-stretch">
                  <input type="password" id="password" class="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password"  value={formData.password} onChange={handleChange}  placeholder="············" />
                </div>
              </div>

              <div class="mb-4">
                <button class="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Sign in</button>
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

export default Login