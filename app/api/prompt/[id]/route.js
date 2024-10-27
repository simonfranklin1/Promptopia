import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database"

// GET (read)
export const GET = async(req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();

        const prompt = await Prompt.findById(id);

        if(!prompt) return new Response({ message: "Prompt não encontrado" }, { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response(`${error.message}`, { status: 500});
    }
}

// PATCH (update)
export const PATCH = async(req, { params }) => {
    const id = params.id;
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(id);

        if(!existingPrompt) return new Response(JSON.stringify({ message: "Prompt não encontrado" }), { status: 404 });

        if(!prompt || !tag) return new Response(JSON.stringify({ message: "Preencha todos os campos" }), { status: 400 });
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify({ message: "Prompt editado com sucesso.", existingPrompt }), { status: 200 })
    } catch (error) {
        return new Response(`${error.message}`, { status: 500});
    }
}

// DELETE (deletar)
export const DELETE = async(req, { params }) => {
    const id = params.id;

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(id);

        if(!existingPrompt) return new Response(JSON.stringify({ message: "Prompt não encontrado" }), { status: 404 });

        const deletePrompt = await Prompt.findByIdAndDelete(id);

        if(!deletePrompt) return new Response(JSON.stringify({ message: "Algo deu errado, tente novamente mais tarde." }), { status: 400 })

        return new Response(JSON.stringify({ message: "Prompt deletado com sucesso", existingPrompt }), { status: 200 })
    } catch (error) {
        return new Response(`${error.message}`, { status: 500});
    }
}