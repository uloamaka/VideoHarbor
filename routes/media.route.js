const router = require("express").Router();
const {
  mediaUpload,
  fetchMedia,
  deleteMedia,
} = require("../controller/media.controller");

const upload = require("../utils/multer.utils");
//const upload = require("../middleware/multer.middleware");
// get all video
router.get("/", fetchMedia);
// create a video
router.post("/", upload.single("video"), mediaUpload);
// update the media
router.delete("/delete", deleteMedia);
//router.delete("/", me);

module.exports = router;
