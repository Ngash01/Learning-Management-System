import { auth } from "@clerk/nextjs";
import { createUploadthing} from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = ()=>{
    const { userId } = auth()

    if(!userId){
        throw new Error("Unauthorized!")
    }
    return userId;
}


export const ourFileRouter = {
    courseImage: f({image : {maxFileCount:1, maxFileSize: "4MB"}})
        .middleware(()=>handleAuth)
        .onUploadComplete((file)=>console.log("File uploaded successfully!", file)),
    courseAttachments: f({image, pdf, text : {maxFileCount: 4, maxFileSize:"1024MB"}})
        .middleware(()=>handleAuth())
        .onUploadComplete((file)=>console.log("These is the attached file", file)),
    courseVideo: f({video : {maxFileCount:1, maxFileSize: "1024MB"}})
        .middleware(()=> handleAuth())
        .onUploadComplete((file)=>console.log("This is the uploaded video", file))
}

