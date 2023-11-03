import jwt, {Secret} from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../db/models/user";
import {UserAttributesInterface, UserCreationAttributesInterface} from "../../../utils/interfaces/user";
import LoginCredentialsInterface from "../../../utils/interfaces/loginCredentialsInterface";

const AuthenticationService = {
    createUser: async (userCreationData: UserCreationAttributesInterface): Promise<true | null> => {
        try {
            const hashedPassword = await bcrypt.hash(userCreationData.password.trim(), 10);

            if (hashedPassword) {
                const createdUser = await User.create({
                    ...userCreationData,
                    password: hashedPassword,
                    userIdentityId: 2,
                });

                if (createdUser) {
                    return true;
                }
            }
            //Should return user was not created
            return null;
        } catch (e) {
            return null;
        }
    },
    login: async (credentials: LoginCredentialsInterface, user: UserAttributesInterface): Promise<string | null> => {
        try {
            const isPasswordsMatch = await bcrypt.compare(credentials.password, user.password);
            const isEmailMatch = credentials.email === user.email;

            if (isPasswordsMatch && isEmailMatch) {
                const secret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;
                return `Bearer ${jwt.sign({id: user.id, username: user.username, role: user.userIdentityId}, secret, {expiresIn: '1h'})}`;
            }

            return null;
        } catch {

            return null;
        }
    }
};
export default AuthenticationService;
