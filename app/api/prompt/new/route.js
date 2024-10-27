import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag
    });

    if(!newPrompt) return new Response({ message: "Algo deu errado ao criar o prompt, por favor tente mais tarde" }, { status: 400});

    return new Response(
      JSON.stringify({
        prompt: {
          creator: userId,
          prompt: prompt,
          tag: tag,
        },
        message: "Prompt criado com sucesso!",
      }), { status: 201 }
    );
  } catch (error) {
    return new Response(`${error.message}`, { status: 500 });
  }
};