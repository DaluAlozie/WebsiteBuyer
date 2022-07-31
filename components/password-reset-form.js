import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'

const TextClass = "text-sm font-bold text-gray-300 font-mono"


export default function ResetForm({handleChange,handleSubmit,error,password}){
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
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label className={TextClass} htmlFor="confirmPassword">
                        Confirm Password     
                   </label>
                    <input
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="******************"
                    />
              
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={submitForm}
                    >
                        Change Password
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