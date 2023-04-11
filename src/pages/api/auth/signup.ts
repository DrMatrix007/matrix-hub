import { models } from "@/models/models";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
type Data = {
	username: string;
	password: string;
	email: string;
};

export default async function Signup(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(405).send({ message: "forbidden" });
		return;
	}
	let credentials = req.body;
	if (credentials?.username && credentials.password && credentials.email) {
		try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(credentials.password,salt);
			const u = new (await models.user)({
				email: credentials.email,
				passwordHash: hash,
				username: credentials.username,
			});
			await u.save();
            res.status(200).send({message:"nice"});
            return;
		} catch (e) {
            console.log(e);
			res
				.status(400)
				.send({ message: "a user with this email/username already exist" });
			return;
		}
	}else {
        res.status(400).send({message:"wrong values"});
    }
}
