"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 prompt_layout">
      {
        data && data.map((post) => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    (async() => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    })()
  }, [])

  const handleChange = (search) => {
    setSearchText(search);
    setFilteredPosts(posts.filter((post) => post.tag.includes(search) || post.creator.name === search || post.prompt.includes(search)));
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const findPosts = posts.filter((post) => post.tag === tag);
    setFilteredPosts(findPosts);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Procure pelo prompt, criador ou tag que deseja"
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList data={searchText !== "" ? filteredPosts : posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
