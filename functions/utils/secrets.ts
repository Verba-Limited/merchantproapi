import dotenv from "dotenv";
import fs from "fs";

// checking if .env file is available
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  console.error(".env file not found.");
}

// checking the environment, so that we can setup our database accordingly
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const PORT = (process.env.PORT || 8080) as number;

// selecting the database URI as per the environment
export const MONGO_URI = prod
  ? (process.env.MONGO_PROD as string)
  : (process.env.MONGO_LOCAL as string);

if (!MONGO_URI) {
  if (prod) {
    console.error(
      "No mongo connection string. Set MONGO_PROD environment variable."
    );
  } else {
    console.error(
      "No mongo connection string. Set MONGO_LOCAL environment variable."
    );
  }
  process.exit(1);
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const COOKIE_KEY = process.env.COOKIE_KEY as string;
