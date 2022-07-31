import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import { TextClass } from "../constants/styling";

export default function LoginForm({handleChange,handleSubmit,error}){

    function submitForm(e) {
        e.preventDefault()      
            handleSubmit(e)
        }    
    
    return(
        <div className="flex justify-center px-6 my-12 ">
            <form className="px-8 pt-6 pb-8 mb-4 bg-blue-800 w-96 rounded-3xl">
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
                <div className="mb-4">
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
                        <div className=" text-right mb-2">
                            <Link className="inline-block "
                                href="/forgot-password">
                                    <span className="px-3 py-2 mb-3 font-mono text-sm leading-tight text-blue-500 align-baseline hover:text-blue-200">
                                        Forgot Password
                                    </span>
                            </Link>
                        </div>
                    </div>
                    
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-mono font-bold text-gray-300 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={submitForm}
                    >
                        Login
                    </button>
                </div>
                <div className="mb-2 text-xs text-red-600">
                    {error}
                </div>        
                <hr className="mb-6 border-t" />
                
                <div className="text-center">
                    <Link className="inline-block "
                        href="/sign-up">
                            <span className="px-3 py-2 mb-3 font-mono text-sm leading-tight text-blue-500 align-baseline hover:text-blue-200">
                                Don't have an account? Sign Up!
                            </span>
                    </Link>

                </div>
            </form>
        </div>
        

    )
}