import mongoose from "mongoose";
import { ConnectLink } from "../../../lib/db";

import BlogModel from "../../../lib/Model/blogSchema";
import { NextResponse } from "next/server";


export async function GET(request, content) {
    await mongoose.connect(ConnectLink).then((val)=>{
        console.log("test connect")
    })
    console.log(content.params.search)
    let topic = await BlogModel.find()
    let maintopic = []
    for ( var i=0;i<topic.length;i++){
        if (topic[i]["title"].toLowerCase().toString().includes(content.params.search.toLowerCase()) || topic[i]["description"].toLowerCase().toString().includes(content.params.search.toLowerCase())){
            maintopic.push(topic[i])
        }
        // if(topic[i]["description"]!=null){
        //     if (topic[i]["description"].toLowerCase().toString().includes(content.params.search.toLowerCase())){
        //         maintopic.push(topic[i])
        //     }

        // }

    }
    if(maintopic.length>0){
    return NextResponse.json({
        Blogdata: maintopic,
        message:"get all data"
    }

    )}
    else{
        return NextResponse.json({
            Blogdata: maintopic,
            message:"not getting data"
        })
    }

}