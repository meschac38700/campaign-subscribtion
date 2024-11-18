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
import fetchJSON from "@/utils/requests";
import {useToast} from "@/hooks/use-toast";
import {useParams, useRouter} from "next/navigation";
import {ErrorResponse} from "@/app/api/campaigns/[slug]/subscribers/route";
import SubscriberInterface from "@/interfaces/subscriber";


const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
})
type FieldValues = {
    email: string;
}

const formSubmissionHandler = async (values: z.infer<typeof formSchema>, slug: string) => {
    return await fetchJSON<Promise<ErrorResponse | SubscriberInterface>>(
        `/api/campaigns/${slug}/subscribers/`,
        {method: "POST", body: JSON.stringify(values)}
    )
}

export default  function SubscribePage() {
    const { toast } = useToast()
    const {slug} = useParams<{ slug: string }>()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const onSubmit =  async (values: z.infer<typeof formSchema>) => {
        const serverResponse = await formSubmissionHandler(values, slug)
        if(serverResponse.status !== 201){
            toast({
                title: "Failed to subscribe",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: `An error occurred: ${serverResponse.json.detail}`,
                variant: "destructive"
            })
            return;
        }
        toast({
            title: "Successfully subscribed",
            description: `${values.email} successfully subscribed to "${slug}".`,
            variant: "success",
        })
        router.push("/")
    }
    return <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold dark:text-white mb-4 mt-4">Subscribe campaign form</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <EmailInput formControl={form.control} campaignSlug={slug} />
                <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Button>
            </form>
        </Form>
    </div>
}

function EmailInput({formControl, campaignSlug} : {formControl: Control<FieldValues>, campaignSlug: string}) {
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
                    Enter an email to subscribe to: <span className="text-blue-600 dark:text-blue-500">{campaignSlug}</span>
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />

}