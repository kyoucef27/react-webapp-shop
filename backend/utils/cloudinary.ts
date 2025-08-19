import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(imageFile: any) {
  try {
    const base64Data = Buffer.from(await imageFile.arrayBuffer()).toString('base64');
    const dataURI = `data:${imageFile.type};base64,${base64Data}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'nadialuxe-products',
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

export async function uploadImages(imageFiles: any[]) {
  try {
    const uploadPromises = imageFiles.map(file => uploadImage(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
}
