import { RawAxiosResponseHeaders, AxiosResponseHeaders } from "axios";

export type GetRequestConfig = {
    abortSignal?: AbortSignal;
}

export type PostRequestConfig = {
    abortSignal?: AbortSignal;
}

export type PutRequestConfig = {
    abortSignal?: AbortSignal;
}

export interface ApiClientInterface {
    get<T>(endpoint: string, params?: object, config?: GetRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }>;
    post<T>(endpoint: string, data?: object, config?: PostRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }>;
    put<T>(endpoint: string, data?: object, config?: PutRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }>;
    delete(endpoint: string): Promise<any>;
    uploadFile(endpoint: string, formData: FormData): Promise<any>;
}
