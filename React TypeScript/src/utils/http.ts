let token = "";

export default async function http<T>(req: RequestInfo): Promise<T> {
    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(await response.text());
    }

    const headers = response.headers;
    const data = headers.get("content-type")?.includes("json")
        ? await response.json() : {};
    
    return data;
}

export const setToken = (newToken: string) => (token = newToken);

export async function get<Res>(path: string): Promise<Res> {
    return await http<Res>(
        new Request(path, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "application/json"
            },
            method: "get"
        })
    );
}

export async function put<Req, Res>(path: string, body: Req): Promise<Res> {
    return await http<Res>(
        new Request(path, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            method: "put"
        })
    );
}

export async function post<Req, Res>(path: string, body: Req): Promise<Res> {
    return await http<Res>(
        new Request(path, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            method: "post"
        })
    );
}