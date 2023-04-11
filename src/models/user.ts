import mongoose, { mongo } from "mongoose";
import { isEmail, isUsername } from "./validator";
import bcrypt from "bcrypt";
import { mongoosePromise } from "@/mongodb/mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{
		methods: {
			comparePasswords: async function (password: string): Promise<boolean> {
				return await bcrypt.compare(password, this.passwordHash);
			},
		},
	}
);



async function main() {
	await mongoosePromise;
	if (mongoose.models.User) {
		return mongoose.model<typeof userSchema>("User");
	}
	return mongoose.model("User", userSchema, "users");
}
export const UserModel = main();
