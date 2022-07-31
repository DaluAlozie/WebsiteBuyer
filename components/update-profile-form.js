import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import { TextClass } from "../constants/styling";

export default function ProfileForm({handleChange,handleSubmit,handleReset,error,details}){

    function submitForm(e) {
        e.preventDefault()
        
            handleSubmit(e)
        }    
                    
    return(
        <div className="flex justify-center px-6 my-12 ">
            <form className="px-8 pt-6 pb-8 mb-4 bg-blue-900 w-96 rounded-3xl">
                <div className="mb-4">
                    <label className={TextClass} htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={details.firstName}
                    />
                </div>
                <div className="mb-4">
                    <label className={TextClass} htmlFor="surname">
                        Surname
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        value={details.surname}

                    />
                    
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-mono font-bold text-gray-300 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleReset}
                    >
                        Reset Password
                    </button>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-mono font-bold text-gray-300 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={submitForm}
                    >
                        Update Profile
                    </button>
                </div>
                <div className="mb-2 text-xs text-red-600">
                    {error}
                </div>        
                <hr className="mb-6 border-t" />
            </form>
        </div>
        

    )
}