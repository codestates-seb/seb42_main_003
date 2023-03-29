 import { useState,useEffect } from "react";

export type uploadImageType = {
	imageName: string; 
  imageSrc:string;
	imageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	imageForSend:  () => FormData | null;
 }

function useUploadImage () {
  const [image, setImage] = useState<FileList>();
  const [imageName,setImageName]=useState<string>('');
  const [imageSrc,setImageSrc]=useState<string>('');
  const [imageFormData,setImageFormData]=useState<FormData|null>(null);

  const imageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  )=> {
    const selectedFile = event.target.files;
    if(selectedFile===null) return;
    if (selectedFile[0] && selectedFile[0].type.match(/(png|jpg|jpeg)$/)) {
      console.log(selectedFile);
      encodeFileToBase64(selectedFile[0]);
      setImage(selectedFile);
    } else {
      alert('jpg, png 확장자만 가능합니다!');
    };
  };

  const imageForSend=()=>{
		if (!image) {
			return null
		} else {
			const formData = new FormData();
			formData.append('image',image[0]);
			return formData;
		}
  }

  const encodeFileToBase64 = (fileBlob:File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve();
      };
    });
  };

  const imageDelete=()=>{
    setImage(undefined);
    setImageName('');
    setImageSrc('');
    setImageFormData(null);
  }

  useEffect(()=>{
    if(image) {
      setImageName(image[0].name)
      setImageFormData(imageForSend);
    }
  },[image])

  return {image, imageName,imageSrc, imageChange, imageFormData, imageDelete}
}


export default useUploadImage;