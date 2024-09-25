export interface UserInfo {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string | null;
    address: string | null;
    country: string | null;
    state: string | null;
    postalCode: string | null;
    aboutMe: string | null;
    quickMessage: string | null;
    createdAt: string;
}