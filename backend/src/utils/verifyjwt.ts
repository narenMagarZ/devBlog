import {verify} from 'jsonwebtoken'
export function VerifyJwt(token:string) {
    const jwtSecret = process.env.JWT_SECRET  as string
    return new Promise(resolve=>{
       return verify(token,jwtSecret,(err,payload)=>{
            if(err) resolve(err)
            else resolve(payload)
        })
    })

}
