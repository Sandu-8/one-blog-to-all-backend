import { Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            DB_NAME: string;
            DB_USER: string;
            DB_HOST: string;
            DB_DRIVER: string;
            DB_PASSWORD: string;
            ACCESS_TOKEN_SECRET: string;
        }
    }
}
