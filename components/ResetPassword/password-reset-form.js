import PasswordStrengthBar from 'react-password-strength-bar';
import { useState, useEffect } from 'react'
import Input from "../FormComponents/inputs";
import Button from "../FormComponents/button";
import Form from "../FormComponents/form";


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
        <Form>
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
            <div className="mb-4 md:mr-2 md:mb-0">
            <Input
                id="confirmPassword"
                type="password"
                placeholder="******************"
                onChange={handleChange}
                required={true}
                label="Confirm Password"
            />
            
            </div>
            <div className="mb-6 text-center">
                <Button
                    type="submit"
                    onClick={submitForm}
                >
                    Change Password
                </Button>
            </div>
            <div className="mb-2 text-xs text-red-600">
                {error}
            </div>        
            <hr className="mb-6 border-t" />
        </Form>
        

    )
}