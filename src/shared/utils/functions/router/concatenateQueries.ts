import {getQueryObject} from "@/shared/utils";
import { buildQuery } from "./buildQuery";

export const concatenateQueries = (queryString: string, ...other: string[]): string => {
    return buildQuery(
        [queryString, ...other]
            .map(value => getQueryObject(value.startsWith("?") ? value : `?${value}`))
            .reduce((prev, cur) => {
                return { ...prev, ...cur };
            })
    );
};
