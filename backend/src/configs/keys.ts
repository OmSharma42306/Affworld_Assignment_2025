import dotenv from "dotenv"
dotenv.config();

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)
console.log(process.env.COOKIE_KEY)
export const keys = {
    googleClientID : process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL : 'http://localhost:3000/auth/google/callback',
    cookieKey : process.env.COOKIE_KEY || ''
}