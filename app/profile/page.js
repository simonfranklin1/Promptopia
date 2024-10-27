"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/components";
import toast from "react-hot-toast";

const DeletePostModal = ({ open, handleClose, handleDelete, loading }) => {
  return (
    <>
      <div
        className={`${open ? "block" : "hidden"
          } fixed w-screen h-screen bg-black opacity-55 z-10`}
        onClick={handleClose}
      />
      <div
        className={`${open ? "block" : "hidden"
          } bg-white w-[400px] h-[370px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 p-5 py-7 flex flex-col rounded-xl`}
      >
        <h3 className="text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center">Deletar Publicação</h3>
        <p className="desc text-center">Tem certeza que deseja deletar essa publicação permanentemente?</p>


        <div className="flex self-end justify-between gap-6 mt-auto">
          <button className="text-gray-500 text-sm border-gray-600 border rounded-lg px-6 py-2" onClick={handleClose}>
            Cancelar
          </button>

          <button className="px-6 py-2 text-sm bg-primary-orange rounded-lg text-white" onClick={handleDelete} disabled={loading}>
            {loading ? `Deletando...` : `Deletar`}
          </button>
        </div>
      </div>
    </>
  );
};

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const res = await fetch(`/api/user/${session.user.id}/posts`);
        const data = await res.json();

        setPosts(data);
      })();
    }
  }, [session?.user.id]);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const confirmDelete = (id) => {
    setOpenModal(true);
    setIdToDelete(id);
  };

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      (async () => {
        const res = await fetch(`/api/prompt/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message);
          const filteredPosts = posts.filter((post) => post._id !== id);
          setPosts(filteredPosts);
          setIdToDelete(null);
          setOpenModal(false);
        } else {
          toast.error(data.message);
        }
      })()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DeletePostModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleDelete={() => handleDelete(idToDelete)}
        loading={loading}
      />
      <Profile
        name={"Meu"}
        desc={"Seja bem-vindo à sua página de perfil"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={confirmDelete}
      />
    </>
  );
};

export default MyProfile;
