const router = require("express").Router();

const mediaRouter = require("./media.route");

router.use("/media", mediaRouter);
module.exports = router;