import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database"

export const GET = async(req, res) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({ }).sort({ _id: -1 }).populate("creator");

        if(!prompts) return new Response({ message: "Algo deu errado ao carregar os dados" }, { status: 400});

        return new Response(JSON.stringify(prompts), { status: 201 })
    } catch (error) {
        return new Response(`${error.message}`, { status: 500});
    }
}