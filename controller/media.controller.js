const cloudinary = require("cloudinary").v2;
const Video = require("../model/video.model");
const {
  videoUploader,
  deleteMediaByPublicId,
} = require("../utils/videoUploader");

const mediaUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { filename, path } = req.file;
    // You can extract additional data from the request if needed
    // const { title, description } = req.body;
    let videoFilename = `untitled_video_${filename}`;
    const result = await videoUploader(filename, path);
    console.log(result);
    const video = new Video({
      videoUrl: result.secure_url,
      videoName: videoFilename,
      publicLink: result.public_id,
      // videoTranscript: req.body.videoTranscript,
    });
    await video.save();

    // Return the newly created video object in the response
    res
      .status(201)
      .json({ message: "Video uploaded successfully", video: video });
  } catch (error) {
    console.error("Error uploading video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the video." });
  }
};

const fetchMedia = async (req, res) => {
  try {
    const videos = await Video.find();
    // Return the list of videos in the response
    res.status(200).json({ videos: videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos." });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { publicId } = req.query; // Extract the publicId from the request body

    if (!publicId) {
      return res.status(400).json({ error: "No Public id provided." });
    }

    // Call the deleteMediaByPublicId function
    const result = await deleteMediaByPublicId(publicId);
    console.log(result);

    if (result.result === "ok") {
      res.status(204).json({ message: "Video deleted successfully" });
    } else {
      // Handle cases where the deletion did not succeed
      res.status(500).json({ error: "Failed to delete the video" });
    }
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "An error occurred while deleting the video." });
  }
};

module.exports = {
  mediaUpload,
  fetchMedia,
  deleteMedia,
};
