import React from "react";
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section
      className="w-full max-w-full flex-start flex-col mb-4"
    >
      <h1 className="head_text text-left"><span className="blue_gradient">{type}</span> Publicação</h1>
      <p className="desc text-left max-w-md">
        {type === "Criar" ? "Crie" : "Edite"} e compartilhe prompts incríveis com o mundo, e deixe sua imaginação fluir em qualquer plataforma de IA.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Seu Prompt de IA</span>
        
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost(prev => ({...prev, prompt: e.target.value }))}
            placeholder="Escreva seu prompt aqui..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#desenvolvimentoweb, #ideia, #produto)
            </span>
          </span>
        
          <input 
            value={post.tag}
            onChange={(e) => setPost(prev => ({...prev, tag: e.target.value }))}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancelar
          </Link>

          <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" type="submit" disabled={submitting}>
          {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
