

// const getdatabyid = async (id) => {
//     const axios = require('axios');
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: { id },
//         headers: {}
//     };


//     axios.request(config)
//         .then((response) => {
//             console.log(JSON.stringify(response.data));
//             return (JSON.stringify(response.data))
//         })
//         .catch((error) => {
//             console.log(error);
//         });

// }
"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";


// Configure Axios with base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default function Edittopic({ params }) {
  const { id } = params;
  
  
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  // Fetch initial topic data
  // useEffect(() => {
  //   // Make a GET request to fetch the initial topic data
  //   api.get(`/Blogpost/${id}`)
  //     .then((response) => {
  //       const Data = response.data;
  //       console.log(Data)
  //       setNewTitle(Data.title);
  //       setNewDescription(Data.description);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [id]); // Run this effect whenever 'id' changes
  useEffect(() => {
    // Make a GET request to fetch the initial topic data
    api.get(`/Blogpost/${id}`)
      .then((response) => {
        const Data = response.data;
        console.log(Data)
        console.log(Data[0]["title"])
        setNewTitle(Data[0]["title"]);
       setNewDescription(Data[0]["description"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the topic data
      await api.put(`/Blogpost/${id}`, {
        newtitle: newTitle,
        newdescription: newDescription,
      });

      // Redirect to the desired page after successful update
      router.push("http://localhost:3000/Components/blog/Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button onClick={handleSubmit} className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </div>
  );
}








//     {console.log(typeof (res))}
//     {
//         res.map((v, i) => {
//             return (
//                 <h1 key={i}>{v.title}</h1>

//             )
//         })
//     }

//     {/* //     Array.isArray(topicData) ? (
//         //     topicData.map((topic, index) => (
//         //         <li key={index}>{topic.title}</li>
//         //     ))
//         // ) : (
//         //     <li>No data available</li>

//        // )} */}


// </div>
