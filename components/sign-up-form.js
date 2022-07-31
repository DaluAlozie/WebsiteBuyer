import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'

const TextClass = "text-sm font-bold text-gray-300 font-mono"

export default function SignUpForm({handleChange,handleSubmit,error,password}){
    const [passwordScore,setPasswordScore] = useState(0)
    const [scoreError,setScoreError] = useState("")

    function updatePasswordScore(score) {
        setPasswordScore(score)
    }

    function submitForm(e) {
        e.preventDefault()
        if (passwordScore >=3) {
            setScoreError("")        
            handleSubmit(e)
        }
        else setScoreError("Password is too week")        
    }
    
    return(
        <div className="flex justify-center px-6 my-12 ">
            <form className="px-8 pt-6 pb-8 mb-4 bg-blue-800 w-96 rounded-3xl">
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className={TextClass} htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="md:ml-2">
                        <label className={TextClass} htmlFor="surname">
                            Last Name
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="surname"
                            type="text"
                            placeholder="Surname"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className={TextClass} htmlFor="email">
                        Email
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className={TextClass} htmlFor="password">
                            Password
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                        <PasswordStrengthBar password={password} onChangeScore={updatePasswordScore}/>
                        <div className="mt-1 mb-2 text-xs text-red-600 ">
                            {scoreError}
                        </div>
                    </div>
                    <div className="md:ml-2">
                        <label className={TextClass} htmlFor="c_password">
                            Confirm Password
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            placeholder="******************"
                        />
                          
                    </div>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={submitForm}
                    >
                        Register Account
                    </button>
                </div>
                <div className="mb-2 text-xs text-red-600">
                    {error}
                </div>        
                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <Link className="inline-block "
                        href="/login">
                            <span className="px-3 py-2 mb-3 text-sm leading-tight text-blue-500 align-baseline hover:text-blue-200">
                                Already have an account? Login!
                            </span>
                    </Link>

                </div>
            </form>
        </div>
        

    )
}