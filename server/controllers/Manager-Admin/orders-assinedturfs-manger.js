import { order } from "../../db/models/orderModel.js";
import { turf } from "../../db/models/turfModel.js";

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

export const managerAssignedTurfsOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const assignedTurfsOrders = await order.find({ managerId: userId });

    res.json({ assignedTurfsOrders });
  } catch (error) {
    console.error("Error fetching assigned turfs:", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};