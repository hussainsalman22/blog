


// import mongoose from 'mongoose';

// blogModel.js


import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    imagelink:String,
  },
);

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", topicSchema);

export default BlogModel;
