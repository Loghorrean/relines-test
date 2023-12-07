import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
import { ApiClientInterface, GetRequestConfig, PostRequestConfig, PutRequestConfig } from "@/shared/api-client";
import { HttpHeaders } from "../../utils";
import { Forbidden, HttpError, PropertyError, Unauthorized, ValidationError } from "../../models";

export class ApiClient implements ApiClientInterface {
    constructor(
        private readonly baseUrl: string,
        private readonly headers: HttpHeaders,
        private readonly authToken: string = ""
    ) {}

    public async get<T>(endpoint = "", params?: object, config?: GetRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }> {
        try {
            const client = this.createClient(params);
            const response = await client.get(endpoint, { signal: config?.abortSignal });
            return {
                data: response.data,
                headers: response.headers,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    public async post<T>(endpoint = "", data?: object, config?: PostRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }> {
        try {
            const client = this.createClient();
            const response = await client.post(endpoint, data, { signal: config?.abortSignal });
            return {
                data: response.data,
                headers: response.headers,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    public async put<T>(endpoint = "", data?: object, config?: PutRequestConfig): Promise<{ data: T, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }> {
        try {
            const client = this.createClient();
            const response = await client.put(endpoint, data, { signal: config?.abortSignal });
            return {
                data: response.data,
                headers: response.headers,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    public async delete(endpoint = ""): Promise<any> {
        try {
            const client = this.createClient();
            const response = await client.delete(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async uploadFile(endpoint = "", formData: FormData): Promise<any> {
        try {
            const client = this.createClient();
            const response = await client.post(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private createClient(params: object = {}): AxiosInstance {
        const config: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            headers: { ...this.headers, "Content-Type": "application/json", Authorization: this.headers["Authorization"] ?? "" },
            params: params,
        };
        if (this.authToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${this.authToken}`,
            };
        }
        return axios.create(config);
    }

    private handleError(error: any): never {
        if (!error.response) {
            throw new HttpError(error.message);
        } else if (error.response.status === 400) {
            const errors: Array<any> = error.response.data.errors instanceof Array ? error.response.data.errors : [];
            throw new ValidationError(
                error.response.data.message,
                errors
                    .filter(item => item && item.propertyPath && item.message)
                    .map(item => new PropertyError(item.propertyPath, item.message))
            );
        } else if (error.response.status === 401) {
            throw new Unauthorized(error.response.data);
        } else if (error.response.status === 403) {
            throw new Forbidden(error.response.data);
        } else {
            throw error;
        }
    }
}
