import mongoose from "mongoose"
import BlogModel from "../../../lib/Model/blogSchema";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db'




export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newtitle: title, newdescription: description } = await request.json();

    // Check if Mongoose is already connected, and if not, establish a connection.
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(ConnectLink);
    }

    // Attempt to update the document by ID.
    const updatedDocument = await BlogModel.findByIdAndUpdate(id, { title, description });

    if (!updatedDocument) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json({ message: "Error updating topic" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(ConnectLink)
    }
    const { id } = params
    const Data = await BlogModel.findOne({ _id: id })
    if (Data == null) {
      return NextResponse.json({ message: "topic not found" }, { status: 404 })
    }
    return NextResponse.json([ Data ] , { message: "topic found" }, { status: 200 })


  } catch (error) {
    console.error("error searching in topic", error)
    return NextResponse.json({ message: "error" }, { status: 500 })

  }


}