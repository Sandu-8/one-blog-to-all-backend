import { Optional } from "sequelize";

export interface UserAttributesInterface {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    userIdentityId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface UserCreationAttributesInterface extends Optional<UserAttributesInterface, 'id'| 'userIdentityId'| 'createdAt'| 'updatedAt'| 'deletedAt'> {};
export interface UserLoginAttributesInterface extends Optional<UserAttributesInterface, 'id'| 'name' | 'lastname' | 'username' | 'userIdentityId'| 'createdAt'| 'updatedAt'| 'deletedAt'> {};
