import jwt from "jsonwebtoken";
import {CookieOptions} from 'express'
export function CreateCookie(cookieContent:{uid:string,email:string}){
    const JWT_SECRET = process.env.JWT_SECRET as string
    const cookie = jwt.sign(cookieContent,JWT_SECRET,{expiresIn:'30 days'})
    const cookieOption : CookieOptions = {
        httpOnly:true,
        path:'/',
        secure:true,
        signed:true,
        sameSite:'lax'
    }
    return {cookie,cookieOption}
}

export function SetCookie(cookieContent:{uid:string,email:string}){
    const {cookie,cookieOption} = CreateCookie(cookieContent)
    const cookieName = process.env.COOKIE_NAME as string
    return {cookie,cookieName,cookieOption}
}