import { turf } from "../../db/models/turfModel";

export const managerAssignedTurfs = async (req, res) => {
  try {
    const userId = req.user.id;
    const assignedTurfs = await turf.find({ assignedTo: userId });

    res.json({ assignedTurfs });
  } catch (error) {
    console.error("Error fetching assigned turfs:", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};

