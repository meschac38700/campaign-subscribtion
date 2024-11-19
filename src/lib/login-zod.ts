import {z} from "zod";

const SignInSchema = z.object({
    username: z.string().min(1, {
        message: "Required",
    }),
    password: z.string().min(1, {
        message: "Required",
    }),
})
export type FieldValues = {
    username: string;
    password: string;
}
const defaultValues = {
    username: "",
    password: "",
}

export {SignInSchema, defaultValues};
