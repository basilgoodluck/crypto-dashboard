import React, { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { signUp } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';
import { FaCheckDouble } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/sign-in');
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      setMessage(axiosError.message || 'Signup failed.');
    }
  };

  return (
    <section className='h-lvh'>
      <div className='w-11/12 md:w-4/5 mx-auto mt-12'>
        <form onSubmit={handleSubmit} method="POST" className='flex flex-col gap-4'>
          <div>
            <p>Name</p>
            <input
            className='w-full border p-2'
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          </div>
          <div>
            <p>Email</p>
            <input
            className='w-full p-2 border'
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          </div>
          <div>
            <p>Password</p>
            <input
            className='w-full border p-2 '
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          </div>
          <div>
            <p>Password</p>
            <input
            className='w-full border p-2'
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          </div>
          <div className='flex justify-between items-center'>
            <button type="submit" className='text-secondary-dark'>Forget password</button>
            <button type="submit" className='bg-secondary-dark text-white p-2 rounded-sm'>Submit</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        <p className='text-xs'>Have an account? <Link className='text-secondary-dark' to="/sign-in">Sign in</Link></p>
      </div>
      <div className='bg-accent-dark shadow-sm shadow-gray-300 w-11/12 md:w-4/5 mx-auto mt-12 p-6 rounded-sm text-text-dark flex items-center gap-4'>
        <div className='relative w-[120px] h-[120px] p-[10px] bg-white rounded-full'>
          <div className='bg-accent-dark w-full relative h-full border-white rounded-full flex justify-center items-center font-bold '>
            100%
          </div>
          <div className='spinElement absolute w-[20px] h-[20px] g-secondary-dark rounded-full'></div>
        </div>
        <div>
          <ul className='text-sm'>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Fast and secure dashboard</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Seamless user experience</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Customizable features</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Reliable customer support</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Signup;
