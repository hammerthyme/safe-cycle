const router = require("express").Router();

//error handling middleware if corresponding router doesn't exist//
router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
