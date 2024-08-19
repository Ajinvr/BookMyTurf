import { turf } from "../../db/models/turfModel.js";
import { order } from "../../db/models/orderModel.js";
import{ manager } from "../../db/models/managerModel.js"
import { user } from "../../db/models/userModel.js";

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


export const adminGetAllManagers = async (req, res) => {
  try {
    const allManagers = await manager.find();

    res.json({ allManagers });
  } catch (error) {
    console.error("Error fetching all Managers:", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};


export const adminGetAllUsers = async (req, res) => {
  try {
    const allUsers = await user.find();

    res.json({ allUsers });
  } catch (error) {
    console.error("Error fetching all Users", error);
    res.status(500).json({ msg: "Internal Server Error", ts: "error" });
  }
};