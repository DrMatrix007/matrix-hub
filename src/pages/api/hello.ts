// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collections } from "@/mongodb/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
  const size = await collections.users.countDocuments();
  res.status(200).json({ name: "John Doe", size: size });
}
