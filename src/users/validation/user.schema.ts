import * as Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
            return helpers.message({ custom: 'Password must contain uppercase letter' });
        }
        if (!/[a-z]/.test(value)) {
            return helpers.message({ custom: 'Password must contain lowercase letter' });
        }
        if (!/[0-9]/.test(value)) {
            return helpers.message({ custom: 'Password must contain number' });
        }
        if (!/[!@#$%^&*]/.test(value)) {
            return helpers.message({ custom: 'Password must contain special character' });
        }
        return value;
    }).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})