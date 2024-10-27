"use client"

import { Feed } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Descubra & Compartilhe
        <br />
        <span className="orange_gradient text-center">
          Prompts com Tecnologia de IA
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia é uma ferramenta open-source de prompts de IA para o mundo moderno, onde é possível descobrir, criar e compartilhar prompts criativos
      </p>

      <Feed />
    </section>
  );
}
