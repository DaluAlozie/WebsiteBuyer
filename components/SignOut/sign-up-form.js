import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import Input from "../FormComponents/inputs";
import Button from "../FormComponents/button";
import Form from "../FormComponents/form";

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
        <Form>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        required={true}
                        label="First Name"
                    />
                </div>
                <div className="md:ml-2">
                    <Input
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        onChange={handleChange}
                        required={true}
                        label="Surname"
                    />
                </div>
            </div>
            <div className="mb-4">
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required={true}
                    label="Email"
                />
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <Input
                        id="password"
                        type="password"
                        placeholder="******************"
                        onChange={handleChange}
                        required={true}
                        label="Password"
                    />
                    <PasswordStrengthBar password={password} onChangeScore={updatePasswordScore}/>
                    <div className="mt-1 mb-2 text-xs text-red-600 ">
                        {scoreError}
                    </div>
                </div>
                <div className="md:ml-2">
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="******************"
                    onChange={handleChange}
                    required={true}
                    label="Confirm Password"
                />
                </div>
            </div>
            <div className="mb-6 text-center">
                <Button
                    type="submit"
                    onClick={submitForm}
                >
                    Register Account
                </Button>
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
        </Form>
        

    )
}