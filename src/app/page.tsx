"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = "/api/sharecontent/getcontent ";

export default function Home() {

  const [allContent, setAllContent] = useState<any[]>([]);
  const [post, setPost] = useState({
    content: "", 
  });

  const handleCreate = async () => {
    try {
      
      const response = await axios.post(
        "/api/sharecontent/createcontent/",
          post,
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate"
            },
          }
      );
      setPost({ content: "" }); 
      
      if (response.status === 200) {
        console.log("After posting link", response);
        setAllContent(response.data.allpost);
      }

    } catch (error) {
      console.error("Error creating post:", error);

    }
  };

  const handleGetContent = async () => {
    try {
      const result = await fetch(API_URL, {
        cache: 'no-store',
        method: 'POST'
      });
  
      const response = await result.json();
      // console.log("Get request resp", response)
      
      if (response) {
        setAllContent(response.data);
        console.log("Content successfully fetched!", response);
      } else {
        console.error("Unexpected response status:", response.status);
      }

    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(()=>{
    handleGetContent();
  },[])

  return (
    <>
      <div className="max-w-8xl mx-auto border-b-[1px] border-neutral-900">
        <div className="py-4 lg:px-8 mx-4 lg:mx-8">
          <header className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-row ">
              <ul className="list-none flex flex-row gap-4">
                {/* <li><Link href={"/sharecontent/createcontent"} >Create Content</Link></li> */}
                <li className="text-3xl">🔗Share Links</li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  className="lg:w-96"
                  value={post.content}
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                  placeholder="Enter link to share"
                />
                <Button onClick={handleCreate} type="submit">
                  Share link
                </Button>
              </div>
              <ModeToggle />
            </div>
          </header>
        </div>
      </div>

      <div className="max-w-8xl mx-auto">
        <div className="py-4 lg:px-8 mx-4 lg:mx-8">
          <Button onClick={handleGetContent} type="submit" >
            Get Links
          </Button>
          {!allContent && (
            <div className="flex justify-center items-center">
              <h1 className="text-6xl font-black">No link</h1>
            </div>
          )}
          {allContent && allContent.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {allContent.map((content) => (
                <div
                  key={content.id || Math.random()}
                  className="bg-white dark:bg-neutral-900 rounded shadow-md p-4"
                >
                  <p className="text-blue-800 text-lg font-bold mb-2">
                    {content.title || "Links"}
                  </p>
                  <p className="text-gray-400 dark:text-white mb-4 dark:bg-black bg-slate-800 p-2 rounded-sm overflow-y-auto ">
                    {content.content || "Content"}
                  </p>
                  <p className="text-gray-400 dark:text-white text-sm text-wrap">
                    Created:{" "}
                    {new Date(
                      content.createdAt || "2024-03-02"
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
