const multer = require("multer");

// Define storage for uploaded videos
const storage = multer.diskStorage({});

// Define the file filter to accept only video files (e.g., MP4, AVI, etc.)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed."), false);
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;