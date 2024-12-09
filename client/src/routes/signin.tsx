import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../api/auth';
import { FaCheckDouble } from 'react-icons/fa';

interface SigninProps {
  onSignin: (token: string, userId: string) => void;
}
const Signin: React.FC<SigninProps> = ({ onSignin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.id);
  
      onSignin(response.data.accessToken, response.data.id); 
  
    } catch (err: unknown) {
      if(err instanceof Error){
        console.error(err); 
        setError(err?.message);
      }else{
        console.log(err)
        setError("Login failed. Please try again.")
      }
    }
  };
  
  return (
    <section className='h-lvh'>
      <div className='w-11/12 md:w-4/5 mx-auto mt-12'>
        <form onSubmit={handleSignin} method="POST" className='flex flex-col gap-4'>
          <div>
            <p>Email</p>
            <input
            className='w-full p-2 border'
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <em className='text-secondary-dark text-xs'>{error}</em>
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
          <div className='flex justify-between items-center'>
            <button type="submit" className='text-secondary-dark'>Forget password</button>
            <button type="submit" className='bg-secondary-dark text-white p-2 rounded-sm'>Submit</button>
          </div>
        </form>
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
export default Signin;
