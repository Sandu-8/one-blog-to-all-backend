import jwt, {Secret} from "jsonwebtoken";
import BlackListTokens from "../../../db/models/blackListTokens";

const AuthorizationService = {
    checkResourceAccess: async (accessToken: string): Promise<boolean> => {
        return new Promise((resolve) => {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret, async (err, decoded) => {
                const token = await BlackListTokens.findOne({
                    where: {
                        token: accessToken,
                    }
                });

                if (token) {
                    return resolve(false);
                }

                return resolve(!err);
            });
        });
    }
};

export default AuthorizationService;
