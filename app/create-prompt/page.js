"use client"

import { Form } from '@/components';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
    category: ''
  })
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push('/');
      }
    } catch (error) {
      toast.error(data.message);
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Criar"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt