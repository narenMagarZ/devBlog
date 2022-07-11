import {OAuth2Client} from 'google-auth-library'
           
           // const client = new OAuth2Client(clientId)
                // async function Verify(_jti){
                //     const ticket = await client.verifyIdToken({
                //         idToken:_jti,
                //         audience:clientId
                //     })
                //     const payload = ticket.getPayload() 
                //     console.log(payload,'payload')
                //     const userId =  payload instanceof Array ?  payload['sub'] : null
                //     console.log(userId,'userid')
                //     const domain =  payload instanceof Array ? payload['hd'] : null
                //     console.log(domain,'domain')
                // }
                // Verify(nbf).catch(err=>{
                //     console.log(err)
                // })