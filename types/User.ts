export interface RegisterUserType {
    name?: string;
    username: string;
    email: string;
    password: string;
    confirm_password?: string;
}

export interface LoginUserType {
    email: string;
    password: string;
}

export interface AuthProvider {
    name: string;
    id: string;
}

export interface CreatedByType {
    name?: string;
    username: string;
    id: string;
}

export interface ManageUserType {
    id: string;
    email: string;
    name: string;
    roles: string[];
    image: string;
    createdAt: Date;
    emailVerified: Date | null;
    disabled: boolean;
}
