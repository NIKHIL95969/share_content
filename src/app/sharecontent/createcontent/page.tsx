// 'use client';

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function Page() { // Use PascalCase for function names
//   const [post, setPost] = useState({
//     content: "", // Initialize content as empty string
//   });

//   const handleCreateContent = async () => {
//     try {
//       const response = await axios.post("/api/sharecontent/createcontent/", post);
//       console.log("Post created successfully:", response.data);
//       setPost({ content: "" }); // Clear content after successful creation
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
//       <textarea
//         className="w-full min-h-96 p-2 text-black border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         value={post.content}
//         onChange={(e) => setPost({ ...post, content: e.target.value })}
//         placeholder="Share your thoughts here..."
//       />
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//         onClick={handleCreateContent}
//       >
//         Create Post
//       </button>
//     </div>
//   );
// }
