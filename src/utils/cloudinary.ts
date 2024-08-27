import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const uploadOnCloudinary = async (
  localFilePath: string,
): Promise<string | null> => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error('File does not exist:', localFilePath);
      return null;
    }

    console.log('Uploading file:', localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath);
    console.log(
      'File successfully uploaded and deleted locally:',
      localFilePath,
    );

    return response.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log('File deleted after error:', localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
