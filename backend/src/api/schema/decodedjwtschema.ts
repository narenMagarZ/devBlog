import joi from 'joi'

export const decodedJwtSchema = joi.object({
    email:joi
    .string()
    .email()
    .required(),

    name:joi
    .string()
    .required(),

    picture:joi
    .string()
    .required(),

    iss:joi
    .string(),

    nbf:joi
    .number(),

    aud:joi
    .string(),

    sub:joi
    .string(),

    azp:joi
    .string(),

    given_name:joi
    .string(),

    family_name:joi
    .string(),

    iat:joi
    .number(),

    exp:joi
    .number(),

    jti:joi
    .string(),

    email_verified:joi
    .boolean()
    .equal(false)
})