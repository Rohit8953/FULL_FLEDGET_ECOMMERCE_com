
const URL='https://api.cloudinary.com/v1_1/dti1g8mbd/image/upload'
const uploadImage=async(Image)=>{
    const formdata=new FormData();
    console.log("rohit bhai aur kya haal hai",formdata);
    formdata.append("file",Image)
    console.log("Image from",Image);
    formdata.append("upload_preset","Images");
    
    const dataResponse = await fetch(URL,{
        method : "post",
        body : formdata
    })

    console.log("response is-->",dataResponse);

    return dataResponse.json()
}
export default uploadImage;