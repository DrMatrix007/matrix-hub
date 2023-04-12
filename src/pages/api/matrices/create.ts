import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { models } from "@/models/models";

export default async function Create(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);
	if (!session || !session.user) {
		res.status(405).send({ message: "you need to be logged in" });
		return;
	}
	const name = req.body?.name;
	const username = session.user.name;

	const user = await (
		await models.user
	).findOne({
		username,
	});

	if (name && user) {
		const SubMatrix = await models.subMatrices;
		const m = new SubMatrix({
			name,
			count: 1,
		});
		try {
			m.save();
			user.subMatrices.push(m.id);
			user.save();

			res.status(200).send({ message: "nice" });
		} catch (e) {
			res
				.status(400)
				.send({ message: "SubMatrix with this name already exist" });
		}
	}
	res.status(400).send({ message: "Wrong input" });
}
