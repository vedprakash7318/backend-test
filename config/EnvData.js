import dotenv from "dotenv"

dotenv.config()

const EnvData={
    PORT: process.env.PORT ||8009,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_PASS:process.env.EMAIL_PASS,
    EMAIL_USER:process.env.EMAIL_USER,
}
export default EnvData