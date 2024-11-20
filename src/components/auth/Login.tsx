import {Button} from "@/components/ui/button";
import {signIn} from "@/auth";
import {useCallback} from "react";

export default function LoginComponent() {
    const onSubmit = useCallback(async (formData: FormData) => {
        "use server"
        await signIn('credentials', formData);
    }, [])
    return <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold dark:text-white mb-4 mt-4">Subscribe campaign form</h1>
        <form action={onSubmit} className="space-y-8" noValidate>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label>
                <input type="text" name="username" id="username"
                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="d.john" required/>
            </div>
            <div>
                <label htmlFor="password"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required/>
            </div>
            <Button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Submit</Button>
        </form>
    </div>
}
