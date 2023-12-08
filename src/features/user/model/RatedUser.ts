import { ProjectUser } from "@/entities/user/model";

export interface RatedUser extends ProjectUser {
    rating: number;
    previousRating: number;
    wasActive: boolean;
}