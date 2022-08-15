import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import { TextClass } from "../../constants/styling";
import Input from "../FormComponents/inputs";
import Button from "../FormComponents/button";
import Form from "../FormComponents/form";

export default function ForgotForm({handleChange,handleSubmit,error}){

    function submitForm(e) {
        e.preventDefault()      
            handleSubmit(e)
        }    
    
    return(
        <Form>
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
            <div className="mb-6 text-center">
                <Button
                    type="submit"
                    onClick={submitForm}
                >
                    Send reset link
                </Button>
            </div>
            <div className="mb-2 text-xs text-red-600">
                {error}
            </div>        
            <hr className="mb-3 border-t" />
     
        </Form>        
    )
}