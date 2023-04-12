import { mongoosePromise } from "@/mongodb/mongoose";
import mongoose, { Schema } from "mongoose";

const subMatrixSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
        count: {
            type: Number,
            required: true,
        }
	},
	{
		methods: {},
	}
);

async function main() {
    await mongoosePromise;
    if (mongoose.models.SubMatrix) {
		return mongoose.model<typeof subMatrixSchema>("SubMatrix");
	}
	return mongoose.model("SubMatrix", subMatrixSchema, "matrices");

}
export const SubMatrixModel = main();
