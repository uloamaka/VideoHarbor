// videoUrl, videoName, videoTranscript(not req), publicLink(not req), 
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  publicLink: {
    type: String,
  },
  videoTranscript: {
    type: String,
  },
});


const Video = mongoose.model("Videos", videoSchema);

module.exports = Video;