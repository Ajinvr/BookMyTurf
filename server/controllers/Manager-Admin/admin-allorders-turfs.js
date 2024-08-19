import { turf } from "../../db/models/turfModel";
import { order } from "../../db/models/orderModel";

export const adminGetAllTurfs = async (req, res) => {
  try {
    const allTurfs = await turf.find();
    
    res.json({ allTurfs });
  } catch (error) {
    console.error("Error fetching all turfs:", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};


export const adminGetAllOrders = async (req, res) => {
  try {
    const allOrders = await order.find({});

    res.json({ allOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};
