import Link from "next/link"
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import { TextClass } from "../constants/styling";
import Input from "./inputs";
import Button from "./button";
import Form from "./form";

const dont = "Don't"

export default function LoginForm({handleChange,handleSubmit,error}){

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
            <div className="mb-4">
                <Input
                    id="password"
                    type="password"
                    placeholder="******************"
                    onChange={handleChange}
                    required={true}
                    label="Password"
                />
                <div className="mb-2 text-right ">
                    <Link className="inline-block "
                        href="/forgot-password">
                            <span className="px-3 py-2 mb-3 font-mono text-sm leading-tight text-blue-500 align-baseline hover:text-blue-200">
                                Forgot Password ?
                            </span>
                    </Link>
                </div>
            </div>           
            <div className="mb-6 text-center">
                <Button
                    className="w-full px-4 py-2 font-mono font-bold text-gray-300 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={submitForm}
                >
                    Login
                </Button>
            </div>
            <div className="mb-2 text-xs text-red-600">
                {error}
            </div>        
            <hr className="mb-6 border-t" />
            
            <div className="text-center">
                <Link className="inline-block "
                    href="/sign-up">
                        <span className="px-3 py-2 mb-3 font-mono text-sm leading-tight text-blue-500 align-baseline hover:text-blue-200">
                            {dont} have an account? Sign Up!
                        </span>
                </Link>

            </div>
        </Form>
     

    )
}