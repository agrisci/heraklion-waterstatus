const router = require("express").Router();

const {
  getAllAreas,
  getSingleAreaById,
} = require("../../controllers/areas.controllers");

// /api/v1/areas
router.get("/", getAllAreas);

// /api/v1/areas/"area id"
router.get("/:id", getSingleAreaById);

module.exports = router;
