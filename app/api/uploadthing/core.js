import { createUploadthing } from "uploadthing/next";
 
const f = createUploadthing();

// async function handleAuth(){
//     const { userId } =  auth()
//     if(!userId) throw new Error("Unauthorized!")
//     return ({userId});
// }

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImage: f({image: {maxFileCount: 1, maxFileSize:"4MB"}})
  // .middleware(()=> handleAuth())
  .onUploadComplete(()=>{}),
  Attachment: f(["image", "video", "pdf", "audio", "text"])
  // .middleware(()=>handleAuth())
  .onUploadComplete(({file})=>{}),
  chapterVideo: f({video: {maxFileCount: 1, maxFileSize:"512GB"}})
  // .middleware(()=>handleAuth())
  .onUploadComplete(()=>{})
}


