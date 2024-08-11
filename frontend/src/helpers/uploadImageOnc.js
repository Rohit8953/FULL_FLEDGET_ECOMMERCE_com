
const URL='https://api.cloudinary.com/v1_1/dti1g8mbd/image/upload'
const uploadImage=async(Image)=>{
    const formdata=new FormData();
    formdata.append("file",Image)
    formdata.append("upload_preset","Images");
    
    const dataResponse = await fetch(URL,{
        method : "post",
        body : formdata
    })
    return dataResponse.json()
}
export default uploadImage;