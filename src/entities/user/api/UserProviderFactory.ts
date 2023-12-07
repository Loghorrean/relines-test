import { ApiClientFactory, ApiClientFactoryInterface } from "@/shared/api-client";
import { HttpHeaders } from "@/shared/utils";
import { UserProvider } from "@/entities/user/api/UserProvider.ts";

export class UserProviderFactory {
    private readonly apiClientFactory: ApiClientFactoryInterface;

    constructor(baseUrl: string, headers: HttpHeaders) {
        this.apiClientFactory = new ApiClientFactory(`${baseUrl}/api/users`, headers);
    }

    public createUserProvider() {
        return new UserProvider(this.apiClientFactory.createClient());
    }
}