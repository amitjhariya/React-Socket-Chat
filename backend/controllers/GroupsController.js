import Groups from "./../models/ChatGroup.js";

export const getAll = async (req, res) => {
  try {
    const data = await Groups.find({});    
    res.status(200).send({
      success: true,
      message: "Groups Retrived Successfuly",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error
    });
  }
};

export const create = async (req, res) => {
  try {
    const { name, image, users, messages, sockets } = req.body;

    const group = new Groups({ name, image, users, messages, sockets });
    const data = await group.save();
    res.status(200).send({
      success: true,
      message: "Group Created Successfuly",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error
    });
  }
};
