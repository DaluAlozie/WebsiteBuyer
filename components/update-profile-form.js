import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import { TextClass } from "../constants/styling";
import Input from "./inputs";
import Button from "./button";
import Form from "./form";

export default function ProfileForm({handleChange,handleSubmit,handleReset,error,details}){

    function submitForm(e) {
        e.preventDefault()
        
            handleSubmit(e)
        }    
                    
    return(
        <Form>
            <div className="mb-4">
                <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={details.firstName}
                    required={true}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <Input
                    id="surname"
                    type="text"
                    placeholder="Surname"
                    value={details.surname}
                    required={true}
                    onChange={handleChange}
                    label="Surname"
                />
                
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
            <hr className="mb-6 border-t" />

            <div className="mt-12 mb-6 text-center">
                <Button
                    type="submit"
                    onClick={handleReset}
                >
                    Reset Password
                </Button>
            </div>
            <div className="mb-2 text-xs text-red-600">
                {error}
            </div>        
        </Form>
    )
}