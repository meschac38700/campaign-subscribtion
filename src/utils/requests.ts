
interface FetchResponse<T>{
    json: T,
    status: number
}

/**
 * Manager Fetch asynchronous request
 * Can be used in client/server mode
 */
export default async function fetchJSON<T>(url: string, options?: RequestInit): Promise<FetchResponse<T>> {
    const _options: RequestInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        ...(options || {})
    }
    if (_options.method?.toUpperCase() !== "GET") _options["body"] = JSON.stringify(_options.body || {});
    const res = await fetch(url, _options);
    return { json: await res.json(), status: res.status };
}