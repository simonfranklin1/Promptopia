"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/components";
import toast from "react-hot-toast";

const UserProfile = ({ params }) => {
    const id = params.id;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if(id) (async () => {
            const response = await fetch(`/api/user/${id}`);
            const data = await response.json();

            if (response.ok) {
                setUser(data);

                const response = await fetch(`/api/user/${id}/posts`);
                const postsData = await response.json();

                setPosts(postsData);
            } else {
                toast.error("Ocorreu algum erro, tente novamente mais tarde");
                router.push("/")
            }

        })()
    }, [id])


    return (
        <>
            {user && posts && (
                <Profile
                    name={`${user.username}`}
                    desc={"Seja bem-vindo ao perfil de " + user.username}
                    data={posts}
                />
            )}
        </>
    );
};

export default UserProfile;