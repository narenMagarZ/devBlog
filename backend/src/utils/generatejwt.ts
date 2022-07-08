import jwt from 'jsonwebtoken'


export function GenerateJwt(id:string) : string {
    const jwtSecret = process.env.JWT_SECRET as string 
    console.log(jwtSecret)
    const jwtContent = {
        'id' : id
    }
    return jwt.sign(jwtContent,jwtSecret,{expiresIn:'30 days'})
}

console.log(GenerateJwt('naren'))