
"use client"

import { useState, useEffect } from "react";
// import authform from ".../User/Authform"
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [input, setinput] = useState("")
  const [link, setlink] = useState("")
  const router = useRouter();
 let name = localStorage.getItem("data")
 

  const handleSubmit = async (e) => {


    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    const data = {
      title: title,
      description: description,
      imagelink: link
    };

    try {
      const response = await axios.post("http://localhost:3000/api/Blogpost", data);
      await console.log(response.data);
      window.location.reload()
      alert("post added")

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setTopics([])
    const fetchData = async () => {
      try {
        let response;

        if (input.length == 0) {
          response = await axios.get("http://localhost:3000/api/Blogpost");
          console.log(response.data.Blogdata)
          setTopics(response.data.Blogdata);
        } else {
          response = await axios.get(`http://localhost:3000/api/searchbyword/${input}`)
          console.log(response.data.Blogdata)
          setTopics(response.data.Blogdata);
        }

      } catch (error) {
        console.error(error);
        // Handle errors here, e.g., show an error message to the user
      }
    };
    

    fetchData();
    
  }, [input]);

  
  const axios = require('axios');

  const Ondelete = async (id) => {
    try {
      const url = `http://localhost:3000/api/Blogpost?id=${id}`;

      const response = await axios.delete(url);

      if (response.status === 200) {
        console.log("Blog post deleted successfully");
        const fetchData = async () => {
          try {
            // Fetch data from the specified URL
            const response = await axios.get("http://localhost:3000/api/Blogpost");
            console.log(response.data.Blogdata);
            // Set the topics state with the fetched data
            setTopics(response.data.Blogdata);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
        // Optionally, you can update your UI or take other actions after successful deletion.
      } else {
        console.error("Failed to delete blog post");
        // Handle other HTTP status codes if needed.
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog post:", error);
      // Handle network errors or other exceptions.
    }
  };


  return (

    <div className="flex flex-col gap-3">
      <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BLOGGER</span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">{name}</a>
            <a href="\Components\User\Authform" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</a>
        </div>
    </div>
</nav></div>
      <h1 className="text-center text-2xl font-bold font-serif my-5">ADD BLOG</h1>


      <div className="bg-blue flex flex-col gap-3 bg-zinc-200 ">

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2 my-7"
          type="text"
          placeholder="Topic Title"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
        />
        <input
          onChange={(e) => setlink(e.target.value)}
          value={link}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="image link"
        />


        <button
          onClick={handleSubmit}
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit mb-5"
        >
          Add Blogs
        </button>
      </div>

      <form>
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" onChange={(e) => setinput(e.target.value)} value={input} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      <h1 className="text-center text-2xl font-bold font-serif">BLOG LIST</h1>




      {
        topics == 0 ? (
          <h1>loading...</h1>

        ) : (
          topics.map((v, i) => (


            <div key={i} className="min-w-md  mx-auto p-4 bg-white shadow-lg rounded-lg flex">
              <img
                src={v.imagelink}
                alt="My Image"
                className="w-1/2 h-50 object-cover rounded-l-lg"
              />
              <div className="p-4 w-1/2">
                <h2 className="font-bold text-xl text-blue-600">{v.title}</h2>
                <div className="text-gray-600 mt-2">{v.description}</div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => Ondelete(v._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                  >
                    Delete
                  </button>
                  <a
                    href={`../../../edittopic/${v._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>



          ))
        )
      }



    </div >
  )
}