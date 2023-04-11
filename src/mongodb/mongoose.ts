import { config } from "dotenv";
import mongoose from "mongoose";
config();
const uri = process.env.MONGO_DB!;
const dbName = process.env.DB_NAME!;
if (uri == undefined || dbName == undefined) {
	throw new Error("need MONGO_DB from env");
}


async function main() {
	await mongoose.connect(uri);
}
export const mongoosePromise = main().catch(err => console.log(err));