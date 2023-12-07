import { UserProviderFactory } from "@/entities/user/api/UserProviderFactory.ts";
import { appConfig } from "@/shared/configs/app.ts";
import { getBaseHeaders } from "@/shared/api-client";

export const createUserProvider = () => {
    const factory = new UserProviderFactory(appConfig.apiBaseUrl, getBaseHeaders());
    return factory.createUserProvider();
}