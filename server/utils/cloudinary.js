import fs from 'fs';
import { cloudinaryInstance } from "../db/config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path);

        fs.unlink(path, (err) => {
            if (err) {
                console.error(`Failed to delete local file: ${err.message}`);
            }
        });

        return uploadResult.url;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message || "Internal server error");
    }
};
