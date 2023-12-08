import { ProjectUser } from "@/entities/user/model";

const mockUsersPerPage = 5;

export const provideMockData = async (): Promise<ProjectUser[]> => {
    return [
        {
            uid: "2667325a-f41d-4433-a698-fe175c7ff36d",
            id: 9709,
            first_name: "Sandy",
            last_name: "Senger",
            username: "sandy.senger"
        },
        {
            id:	5886,
            uid: "9d829c2d-0a11-4140-b211-22ec545a296d",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5887,
            uid: "7cc3cdce-625f-4f43-a811-fffe03ab5cda",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5888,
            uid: "31b90744-5b5f-49f2-b25e-b4926b0c8a7b",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5889,
            uid: "147090ab-82d4-4912-b799-86a56c2e6937",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5890,
            uid: "37c35633-300a-4df2-a483-e901e5c6a0fd",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5812,
            uid: "14a39f33-e608-43b5-bc87-e7d7e7a89480",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5813,
            uid: "d38eddd2-f9e8-4f05-99c1-c5a64f123afe",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5814,
            uid: "4e0c05d5-156e-424d-82f1-33f372aff3f2",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        },
        {
            id:	5815,
            uid: "b02eb214-5ebd-4456-b445-926afa5289be",
            first_name: "Retha",
            last_name: "Waters",
            username: "retha.waters"
        }
    ];
}

export async function generatePaginatedResponse(page: number) {
    const start = page * mockUsersPerPage;
    const slice = (await provideMockData()).slice(start, start + mockUsersPerPage);
    return slice.map(item => ({
        ...item,
        rating: 0,
        previousRating: 0,
        wasActive: false,
    }));
}