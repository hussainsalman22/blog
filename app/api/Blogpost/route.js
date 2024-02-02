import mongoose from "mongoose"
import BlogModel from "../../lib/Model/blogSchema";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../lib/db'



export async function POST(request) {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(ConnectLink);
    console.log("Connected to MongoDB");

    // Parse the incoming JSON request body
    const { title, description, imagelink } = await request.json();

    // Perform data validation if needed
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    // Create a new blog post using the BlogModel
    await BlogModel.create({ title, description, imagelink });
    
    // Return a success response
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function GET() {
  await mongoose.connect(ConnectLink).then((val) => {
    console.log("test connect")
  })
  const Blogdata = await BlogModel.find();
  return NextResponse.json({ Blogdata });
}



export async function DELETE(request) {
  try {
    // Extract the 'id' parameter from the request URL.
    const id = request.nextUrl.searchParams.get("id");

    // Check if Mongoose is already connected, and if not, establish a connection.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(ConnectLink);
    }

    // Attempt to delete the document by ID.
    const deletedDocument = await BlogModel.findByIdAndDelete(id);

    if (!deletedDocument) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json({ message: "Error deleting topic" }, { status: 500 });
  }
}

