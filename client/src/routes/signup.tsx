import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';
import { FaCheckDouble } from 'react-icons/fa';
import { FaRegCheckCircle } from "react-icons/fa"; 
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { useNotification } from '../hooks/notificationContext.js';
import FAQs from '../components/faq.js';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}
type ValidationResult = {
  valid: boolean;
  message: string;
};

const Signup: React.FC = () => {
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();
  const [validationResults, setValidationResults] = useState<ValidationResult[]>(validatePassword(""));
  const [showPassword1, setShowPassword1] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)
  const { setNotification } = useNotification()
  
 function validatePassword (pwd: string) {
    const conditions = [
      {isValid: (pwd: string) => pwd.length >= 8, message: "Password length must be 8 and above" },
      {isValid: (pwd: string) => /[A-Z]/.test(pwd), message: "Must include at least one uppercase letter" },
      {isValid: (pwd: string) => /[0-9]/.test(pwd), message: "Must include at least one number" },
      {isValid: (pwd: string) => /[!@#$%^&*]/.test(pwd), message: "Must include at least one special character (!@#$%^&*)" },
    ];
  
    return conditions.map((condition) => ({
      valid: condition.isValid(pwd),
      message: condition.message
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  
    if (name === "name") {
      setError((prevData) => ({
        ...prevData,
        name: value.trim() === "" ? "Name is required" : ""
      }));
    }
  
    if (name === "email") {
      if (value.trim() === "") {
        setError((prevData) => ({
          ...prevData,
          email: "Email is required"
        }));
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
        setError((prevData) => ({
          ...prevData,
          email: "Enter a valid email"
        }));
      } else {
        setError((prevData) => ({
          ...prevData,
          email: ""
        }));
      }
    }
  
    if (name === "password") {
      const results = validatePassword(value);
      setValidationResults(results);
    
      const isInvalid = results.some((result) => !result.valid); 
      setError((prevData) => ({
        ...prevData,
        password: isInvalid ? "Invalid password" : ""
      }));
    }
    
  
    if (name === "confirmPassword") {
      setError((prevData) => ({
        ...prevData,
        confirmPassword:
          value.trim() !== formData.password.trim()
            ? "It must match with the password field"
            : ""
      }));
    }
  };
  
  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
  
    if (name.trim() === "") {
      setError((prevData) => ({
        ...prevData,
        name: "Name is required"
      }));
    }
  
    if (email.trim() === "") {
      setError((prevData) => ({
        ...prevData,
        email: "Email is required"
      }));
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      setError((prevData) => ({
        ...prevData,
        email: "Enter a valid email"
      }));
    }
  
    if (password.trim() === "") {
      setError((prevData) => ({
        ...prevData,
        password: "Password is required"
      }));
    }
  
    if (confirmPassword.trim() !== password.trim()) {
      setError((prevData) => ({
        ...prevData,
        confirmPassword: "It must match with the password field"
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validateForm();
  
    const allTestsPassed = validationResults.every((result) => result.valid);
    const noErrors = Object.values(error).every((err) => err.trim() === "");
  
    if (!allTestsPassed || !noErrors) {
        setNotification({ message: "Please fix the errors before submitting the form.", type: "error" });
        return;
    }

    try {
      const response = await signUp(formData);
      
      if (response && response.status >= 200 && response.status < 300) {
          setNotification({ message: "Congratulations, your account was created!", type: "success" });
          navigate("/sign-in");
      } else {
          setNotification({ message: response?.data?.message || "An error occurred while creating your account.", type: "error" });
      }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setNotification({ message: error.message || "Something went wrong. Please try again.", type: "error" });
        }
      }
  };

  

  return (
    <section className=''>
      <div className='w-11/12 md:w-4/5 mx-auto mt-12'>
        <form onSubmit={handleSubmit} method="POST" className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>name <span className='text-secondary'>*</span></p>
            <input
              className={`w-full px-2 py-4 text-sm outline-none border shadow-md shadow-gray-300 ${error.name.length !== 0 ? "border-b-secondary" : " border-gray-300"} rounded-md `}
              name="name"
              placeholder="fullname"
              onChange={handleChange}
            />
            <p className="text-[10px] text-secondary">{error.name}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>email <span className='text-secondary'>*</span></p>
            <input
              className={`w-full px-2 py-4 shadow-md shadow-gray-300 border border-gray-300 text-sm rounded-md outline-none ${error.email.length !== 0 ? "border-b-secondary" : " border-gray-300"}`}
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
            <p className="text-[10px] text-secondary">{error.email}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>password <span className='text-secondary'>*</span></p>
            <div className='relative'>
              <input
                type={showPassword1 ? "text" : "password"}
                className={`w-full shadow-md shadow-gray-300 border border-gray-300 px-2 py-4 text-sm rounded-md outline-none ${error.password.length !== 0 ? "border-b-secondary" : "border-gray-300"}`}
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
            <p className="text-[10px] text-secondary">{error.password}</p>
            <div className='flex flex-col gap-[7px]'>
              {
                validationResults.map((e, idx) => (
                  <p key={idx} className='text-[10px] text-gray-400'><FaRegCheckCircle className={`inline ${e.valid ? "text-green-300" : "text-inherit"}`} />{e.message}</p>
                ))
              }
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>confirm password <span className='text-secondary'>*</span></p>
            <div className='relative'>
              <input
                type={showPassword2 ? "text" : "password"}
                className={`w-full shadow-md shadow-gray-300 border border-gray-300 px-2 py-4 text-sm rounded-md outline-none ${error.confirmPassword.length !== 0 ? "border-b-secondary" : "border-gray-300"}`}
                name="confirmPassword"
                placeholder="confirm password"
                onChange={handleChange}
              />
              {showPassword2 ? (
                <BsEyeSlashFill
                  className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword2(false)}
                />
              ) : (
                <IoEyeSharp
                  className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword2(true)}
                />
              )}
            </div>
            <p className="text-[10px] text-secondary">{error.confirmPassword}</p>
          </div>
          <div className='flex justify-between items-center py-2'>
            <button type="submit" className=' underline underline-offset-1 text-sm'>Forget password</button>
            <button type="submit" className='bg-accent-dark text-white py-2 px-3 rounded-md text-sm'>Submit</button>
          </div>
        </form>
        <p className='text-xs'>Have an account? <Link className='text-secondary' to="/sign-in">Sign in</Link></p>
      </div>
      {/* <div className='bg-accent-dark shadow-sm shadow-gray-300 w-11/12 md:w-4/5 mx-auto mt-12 p-6 rounded-sm text-text-dark flex items-center gap-4'>
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
      </div> */}
      <FAQs />
    </section>
  );
};

export default Signup;
