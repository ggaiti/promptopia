"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const filterPosts = (text) => {
    const regex = new RegExp(text, "i");
    return allPosts.filter((post) => {
      console.log(post.prompt);
      return (
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
      );
    });
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchResult = filterPosts(e.target.value);
    setFilteredPosts(searchResult);
  };
  const handleTagSubmit = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setFilteredPosts(searchResult);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagSubmit} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagSubmit} />
      )}
    </section>
  );
};

export default Feed;
