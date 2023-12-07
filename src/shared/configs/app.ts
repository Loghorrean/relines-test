export const appConfig = {
    get apiBaseUrl() {
        return process.env.API_BASE_URL ?? "";
    },
    get usersPerPage() {
        return 5;
    }
};
