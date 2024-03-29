import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateAccount = () => {

    const [formData, setFormData] = useState({
        email: '',
    });

    const navigate = useNavigate();

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
            toast.loading('Please Wait for a While...');
            const response = await axios.post('http://localhost:4000/api/v1/sendotp', formData);
            
            // if(response){
            //     toast.dismiss();
            //     toast.success('OTP Sent Successfully!');
            // }
            setTimeout(()=>{
                toast.dismiss();
                toast.success('OTP Sent Successfully!');
                navigate('/signup');
            },1000);
        } catch (error) {
            console.error('Error Sending Mail:', error.message);
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="h-screen bg-white flex-column items-center justify-center">
            <div class="bg-white w-screen font-sans text-gray-900">
            <Toaster  position="top-right"  toastOptions={{success: {duration: 3000}}}/>
                <div class=" ">
                    <div class="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
                        <div class="mx-2 py-5 text-center md:mx-auto md:w-2/3 md:py-10">
                            <h1 class="mb-0 text-3xl font-black leading-4 sm:text-2xl xl:text-4xl">Create New Account</h1>
                        </div>
                    </div>
                </div>
                <div class="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
                    <form class="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8" onSubmit={handleSubmit}>
                        <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="email">E-mail</label><input class="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring" id="email" type="email" placeholder="email" required name="email" value={formData.email} onChange={handleChange} /><span class="my-2 block"></span></div>
                        <div class="mb-6">
                            <div class="text-gray-800 flex items-center justify-between">
                                <p class="">
                                    Already Have an Account?
                                    <a class="cursor-pointer text-blue-500" onClick={() => { navigate('/login') }}> Login</a>
                                </p>
                            <button class="cursor-pointer rounded bg-blue-600 hover:bg-blue-700 py-2 px-8 text-center text-lg font-bold  text-white" type="submit">Create Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateAccount