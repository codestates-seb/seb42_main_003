// import { useState,useEffect } from "react";

function useUploadImage () {
//   const [image, setImage] = useState(null);
//   const [imageName,setImageName]=useState(null);

//   const imageChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   )=> {
//     const selectedFile = event.target.files;
//     if(selectedFile===null) return;
//     if (selectedFile[0] && selectedFile[0].type.match(/(png|jpg|jpeg)$/)) {
//       setImage(selectedFile);
//     } else {
//       alert('jpg, png 확장자만 가능합니다!');
//     };
//   };

//   const imageForSend=(
//     event: React.ChangeEvent<HTMLInputElement>
//   )=>{
//     if(image===null) return null;
//     const formData = new FormData();
//     formData.append('image',image[0]);
//     return formData;
//   }

//   useEffect(()=>{
//     if(image) setImageName(image[0].name)
//   },[image])

//   return [imageName,imageChange,imageForSend]
}


export default useUploadImage;