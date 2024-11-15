import { useState, useEffect } from "react";

async function getErrorReason(res: Response) {
    const data = await res.json();
    return data.detail || data.reason.message;
}

interface FetchReturn <T> {
    data: T,
    errors: string[],
    status: number,
    isLoading: boolean
}

/**
 * Manage asynchronous fetch request
 * Can be used only in client mode
 * @returns {{data: Object, error: String[], isLoading: Boolean, status: Number}}
 */
export default function useFetch<T>(url: string, initial: T, options?: RequestInit): FetchReturn<T> {
    const [data, setData] = useState<T>(initial);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState(500);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(url, options || {})
            .then(async (res) => {
                setStatus(res.status);
                if (res.status >= 400) {
                    const errorMessage = await getErrorReason(res);
                    setErrors((errs) => Array.from(new Set([...errs, errorMessage])));
                    return null;
                }
                return res.json();
            })
            .then((resData) => setData(resData))
            .catch((reason) =>
                setErrors((errs) => Array.from(new Set([...errs, reason.message])))
            )
            .finally(() => setIsLoading(false));
    }, [url, options]);

    return { data, errors, isLoading, status };
}