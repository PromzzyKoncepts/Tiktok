import React, { useState } from 'react'
import TextInput from '../Profile/TextInput'
import { BiLoaderCircle } from 'react-icons/bi'
import { showErrorObject } from '@/app/types'

const Register = () => {
    const[loading, setLoading ] =useState<boolean>(false)
    const[name, setName ] =useState<string | ''>('')
    const[username, setUsername ] =useState<string | ''>('')
    const[email, setEmail ] =useState<string | ''>('')
    const[password, setPassword ] =useState<string | ''>('')
    const[confirmPassword, setConfirmPassword ] =useState<string | ''>('')
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
        <h1 className="text-center text-[28px] mb-4 font-bold">Create Account</h1>
        <div className="px-6 pb-2">
            <TextInput
            string={name}
            placeholder='FullName'
            onUpdate={setName}
            inputType='text'
            error={showError('name')}
             />
        </div>
        <div className="px-6 pb-2">
            <TextInput
            string={username}
            placeholder='Username'
            onUpdate={setUsername}
            inputType='text'
            error={showError('username')}
             />
        </div>
        <div className="px-6 pb-2">
            <TextInput
            string={email}
            placeholder='Email address'
            onUpdate={setEmail}
            inputType='email'
            error={showError('email')}
             />
        </div>
        <div className="px-6 pb-2 mt-4">
            <TextInput
            string= {password}
            placeholder='enter password'
            onUpdate={setPassword}
            inputType='password'
            error={showError('password')}
             />
        </div>
        <div className="px-6 pb-2">
            <TextInput
            string= {confirmPassword}
            placeholder='confirm password'
            onUpdate={setConfirmPassword}
            inputType='password'
            error={showError('confirmPassword')}
             />
        </div>

        <div className="px-6 mt-6">
            <button className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${(!email || !password || !name || !confirmPassword) ? 'bg-gray-200 text-gray-700' : 'bg-[#f02c56] text-white'}`}>
                {loading ? (<BiLoaderCircle size={23} className='animate-spin' color='#f02c56' />) : 'Create account'}
            </button>
        </div>
        
      </div>
    </>
  )
}

export default Register
