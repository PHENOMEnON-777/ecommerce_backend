import {z} from 'zod'

export const SignUpSchema = z.object({
    name: z.string(),
    email:z.string().email(),
    password:z.string().min(8)
});

export const AddaddressSchema = z.object({
    lineone:z.string(),
    linetwo:z.string().nullable(),
    pincode:z.string().length(6),
    country: z.string(),
    city: z.string(),
    userId: z.number()
    
})