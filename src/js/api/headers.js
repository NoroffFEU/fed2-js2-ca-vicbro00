import { API_KEY } from "./constants.js";

export function headers() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append("Authorization", `Bearer ${API_KEY}`);
    }

    return headers;
}
