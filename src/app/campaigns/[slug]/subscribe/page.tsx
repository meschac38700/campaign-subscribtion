"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {Button} from "@/components/ui/button";
import {Control, useForm} from "react-hook-form";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";


const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
})
type FieldValues = {
    email: string;
}

export default  function SubscribePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const onSubmit =  (values: z.infer<typeof formSchema>) => {
        console.log("Subscribe page form", values)
        debugger
    }
    return <div className="max-w-sm mx-auto">
        <h1 className="text-4xl font-extrabold dark:text-white mb-4 mt-4">Subscribe campaign form</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <EmailInput formControl={form.control}/>
                <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Button>
            </form>
        </Form>
    </div>
}

function EmailInput({formControl} : {formControl: Control<FieldValues>}) {
    return <FormField
        control={formControl}
        name="email"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="john@example.com" {...field} type="email" />
                </FormControl>
                <FormDescription>
                    Enter an email to subscribe to:
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />

}