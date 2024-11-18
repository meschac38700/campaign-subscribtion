interface FetchResponse<T>{
    json: T,
    status: number
}

type ProfilerState = {
    setIsLoading: (value: boolean) => void;
    setError: (value: string) => void;
}

/**
 * Manager Fetch asynchronous request
 * Can be used in client/server mode
 */
export default async function fetchJSON<T>(url: string, options?: RequestInit, profiler?: ProfilerState): Promise<FetchResponse<T>> {
    profiler?.setIsLoading?.(true)
    let json = null
    let status = 500
    const _options: RequestInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        ...(options || {})
    }

    try{
        const res = await fetch(url, _options);
        status = res.status;
        json = await res.json();
    }catch(error){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        profiler?.setError?.(error.toString());
    }
    profiler?.setIsLoading?.(false)
    return { json, status };
}