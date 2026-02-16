import { useState } from "react";
import { loginSchema, type LoginFormData } from "../model/schema/loginSchema";
import {ZodError} from "zod";

export function useLoginForm(initialValues: LoginFormData) {
    const [values, setValues] = useState<LoginFormData>(initialValues)
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})

     const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };


    const validate = (): boolean => {
        try{
            loginSchema.parse(values);
            setErrors({})
            return true
        } catch(error: unknown) {
            if(error instanceof ZodError){
                const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
                error.issues.forEach(error => {
                    const key = error.path[0] as keyof LoginFormData;
                    fieldErrors[key] = error.message
                });
                setErrors(fieldErrors)
            }
            return false            
        }
    };
    return { values, errors, validate, handleChange, setValues }
}