import React, { useState } from 'react';
import { Link} from 'react-router-dom';

interface SigninProps {
  onSignin: (token: string, userId: string) => void;
}
const Signin: React.FC<SigninProps> = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(name)
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div>
      <div>
        <form  method="POST">
          <input
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p><Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
