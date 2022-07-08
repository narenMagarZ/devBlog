import jwt from 'jsonwebtoken'


export function VerifyJwt(token:string) {
    const jwtSecret = process.env.JWT_SECRET  as string
    return jwt.verify(token,jwtSecret,(err,payload)=>{
        if(err) return err.message
        else return payload
    })
}
