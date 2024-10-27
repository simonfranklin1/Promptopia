"use client"

import { Form } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";

const EditPrompt = () => {
    const params = useSearchParams();
    const promptId = params.get("id");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })
    const router = useRouter();

    useEffect(() => {
        if(promptId) (async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        })();
    }, [promptId])


    const editPrompt = async (e) => {
        e.preventDefault();

        if(promptId) {
            setSubmitting(true);

            try {
                const res = await fetch(`/api/prompt/${promptId}`, {
                    method: "PATCH",
                    body: JSON.stringify(post),
                    headers: { "Content-Type": "application/json" }
                });
        
                const data = await res.json();
        
                if (res.ok) {
                    toast.success(data.message);
                    router.push("/");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        } else {
            toast.error("Está faltando o id da publicação");
        }
    }

    return (
        <>
            {post && <Form
                type="Editar"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editPrompt}
            />}
        </>
    )
}

export default EditPrompt