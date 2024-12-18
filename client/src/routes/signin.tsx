import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../api/auth.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { useNotification } from '../hooks/notificationContext.js';
import axios from 'axios';
import { useAuth } from '../hooks/authProvider.js';
import FAQs from '../components/faq.js';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

const Signin: React.FC = () => {
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { SignIn } = useAuth();
  const location = useLocation();
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const {email, password} = formData;
      if(!email || !password){
        setNotification({ 
          message: "Empty required field, idiot!", 
          type: "error" 
        });
        return 
      }
      const response = await signIn(formData);
      if(response && response.status >= 200 && response.status < 300){
        SignIn(response.data.accessToken, response.data.username)
        setNotification({ message: "Login successful", type: "success"})
      }
      const from = location.state?.from?.pathname || `/dashboard`;
      navigate(from, { replace: true });
    }  catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "Error during sign in";
          setNotification({ 
              message: errorMessage, 
              type: "error" 
          });
      } else {
          setNotification({ 
              message: "An unexpected error occurred", 
              type: "error" 
          });
      }
    }
    finally{
      setIsLoading(false)
    }
    
  };

  return (
    <section className=''>
      <div className='w-11/12 md:w-4/5 mx-auto mt-12 pt-12'>
        <form onSubmit={handleSubmit} method="POST" className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>email <span className='text-secondary'>*</span></p>
            <input
              className={`w-full px-2 py-4 shadow-md shadow-gray-300 border border-gray-300 text-sm rounded-md outline-none`}
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>password <span className='text-secondary'>*</span></p>
            <div className='relative'>
              <input
                type={showPassword1 ? "text" : "password"}
                className={`w-full shadow-md shadow-gray-300 border border-gray-300 px-2 py-4 text-sm rounded-md outline-none `}
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
              {showPassword1 ? (
                <BsEyeSlashFill
                  className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword1(false)}
                />
              ) : (
                <IoEyeSharp
                  className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword1(true)}
                />
              )}
            </div>
          </div>
          <div className='flex justify-between items-center py-2'>
          <p><Link className=' underline underline-offset-1 text-sm' to="/sign-up">Forget password</Link></p>
            <button disabled={isLoading} type="submit" className={`${isLoading ? "bg-gray-300" : "bg-accent-dark"}  text-white py-2 px-3 rounded-md text-sm`}>Submit</button>
          </div>
        </form>
        <p className='text-xs'>New here? <Link className='text-secondary' to="/sign-up">Sign up</Link></p>
      </div>
      <FAQs />
    </section>
  );
};

export default Signin
