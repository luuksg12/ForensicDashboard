
import React from 'react';
import validator from 'validator';
export const validateRegisterInput = (email: string, password: string, retypedPassword: string, firstname: string, lastname: string, addition?: string): string | number => {
    if(!validator.isAlpha(firstname)) return "Invalid firstname."
    if(!validator.isAlpha(lastname)) return "Invalid lastname."
    if(addition){
        if(!validator.isAlpha(addition)) return "Invalid addition."
    }
    if(!validator.isEmail(email)) return "Invalid email."
    if(!validator.isStrongPassword(password, { minLength: 8, minUppercase: 1, minSymbols: 1})) return "Invalid password, min 8 chars, 1 special and 1 capital."
    if(password != retypedPassword) return "Passwords do not match."
    return 1;
}