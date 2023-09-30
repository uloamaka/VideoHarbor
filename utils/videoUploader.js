require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
});

const videoUploader = async (id, path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "video",
    public_id: `${id}`,
    width: 640,
    height: 480,
    crop: "fill",
    format: "mp4",
  });

  return result;
};

const deleteMediaByPublicId = async (publicId) => {
  try {
    // Delete the media by public_id
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("Media deleted successfully.");
    } else {
      console.error("Error deleting media.");
    }

    return result;
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
};

module.exports = { videoUploader, deleteMediaByPublicId };
