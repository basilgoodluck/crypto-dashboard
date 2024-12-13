import React from 'react';
import { useAuth } from '../hooks/authProvider';


export const Dashboard: React.FC = () => {
  const { username } = useAuth();

  return (
    <section className='background-container overflow-x-hidden' id='background-container'>
      <div className=' bg-background-dark flex justify-start items-center gap-12 mt-12 pt-12 flex-col lg:flex-row w-11/12 md:w-4/5 mx-auto'>
        <h1>Hello {username}</h1>
      </div>
    </section>
  )
}

