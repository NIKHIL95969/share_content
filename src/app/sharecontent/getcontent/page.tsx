// 'use client'; 
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const API_URL = '/api/sharecontent/getcontent';

// export default function Page() { 
//   const [allContent, setAllContent] = useState<any[]>([]); 

//   const getContent = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       if (response.status === 200) {
//         setAllContent(response.data.data); 
//         console.log('Content successfully fetched!'); 
//       } else {
//         console.error('Unexpected response status:', response.status); 
//       }
//     } catch (error) {
//       console.error('Error fetching content:', error); 
//     }
//   };

//   useEffect(() => {
//     getContent(); 
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <button onClick={getContent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Get Content
//       </button>
//       {allContent.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {allContent.map((content) => (
//             <div
//               key={content._id || Math.random()} 
//               className="bg-white rounded shadow-md p-4"
//             >
//               <p className="text-gray-800 text-lg font-bold mb-2">{content.title || 'Title'}</p>
//               <div className="bg-slate-800 min-h-96 flex flex-row text-white rounded shadow-md">
//                 {/* <p className=" mb-4">{content.content.replace(/\t/g, '    ').replace(/\n/g, '<br/>') || 'Content'}</p> */}
//                 {/* <pre>{JSON.stringify(content.content, null, 2)} </pre> */}
              
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Created: {new Date(content.createdAt || '2024-03-02').toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
