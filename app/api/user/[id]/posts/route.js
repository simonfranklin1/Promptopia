import Prompt from "@/models/prompt";
import User from "@/models/user";
import { connectToDB } from "@/utils/database"

export const GET = async(req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();

        const user = await User.findById(id);

        if(!user) {
            return new Response(JSON.stringify({ message: "Usuário não encontrado!"}), { status: 404 });
        }

        const userPosts = await Prompt.find({ creator: id }).sort({ _id: -1 }).populate("creator");

        if(!userPosts) {
            return new Response(JSON.stringify({ message: "Erro ao buscar publicações, por favor tente mais tarde!"}), { status: 404 });
        }

        return new Response(JSON.stringify(userPosts), { status: 200 })
    } catch (error) {
        return new Error(`${error.message}`, { status: 500 })
    }
}