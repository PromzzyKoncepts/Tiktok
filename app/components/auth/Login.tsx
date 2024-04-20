import { showErrorObject } from '@/app/types'
import React, { useState } from 'react'
import TextInput from '../Profile/TextInput'
import { BiLoaderCircle } from 'react-icons/bi'

const Login = () => {
    const[loading, setLoading ] =useState<boolean>(false)
    const[email, setEmail ] =useState<string | ''>('')
    const[password, setPassword ] =useState<string | ''>('')
    const[error, setError ] =useState<showErrorObject | null>(null)

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
          return error.message;
        }
        return "";
      };

  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>
        <div className="px-6 pb-2">
            <TextInput
            string={email}
            placeholder='Email address'
            onUpdate={setEmail}
            inputType='email'
            error={showError('email')}
             />
        </div>
        <div className="px-6 pb-2">
            <TextInput
            string= {password}
            placeholder='enter password'
            onUpdate={setPassword}
            inputType='password'
            error={showError('password')}
             />
        </div>

        <div className="px-6 mt-6">
            <button className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${(!email || !password) ? 'bg-gray-200 text-gray-800' : 'bg-[#f02c56] text-white'}`}>
                {loading ? (<BiLoaderCircle size={23} className='animate-spin' color='#f02c56' />) : 'Log In'}
            </button>
        </div>
        
      </div>
    </>
  )
}

export default Login
