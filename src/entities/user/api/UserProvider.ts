import { ApiClientInterface } from "@/shared/api-client";
import { buildQuery } from "@/shared/utils";
import { ProjectUser } from "@/entities/user/model";

export class UserProvider {
    constructor(private readonly apiClient: ApiClientInterface) {}

    public async getUsersList(page: number, size: number): Promise<Array<ProjectUser>> {
        return (await this.apiClient.get<Array<ProjectUser>>(`/random_user?${buildQuery({ page, size })}`)).data;
    }
}