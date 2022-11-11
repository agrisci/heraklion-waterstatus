const Area = require("../models").Area;

const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find({}).populate({
      path: "log",
      options: { sort: { datetime: -1 }, perDocumentLimit: 1 },
    });
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ Error: "Something went wrong..." });
  }
};

const getSingleAreaById = async (req, res) => {
  const id = req.params.id;
  try {
    const areas = await Area.findById(id)
      .populate({
        path: "log",
        options: { sort: { datetime: -1 } },
      })
      .exec();
    if (areas === null) {
      // id provided format was right but no area found
      res.status(404).json([]);
    } else {
      res.status(200).json(areas);
    }
  } catch (error) {
    res.status(500).json({ Error: "Something went wrong..." });
  }
};

module.exports = { getAllAreas, getSingleAreaById };
