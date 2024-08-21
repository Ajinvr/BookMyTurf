import { turf } from "../../db/models/turfModel.js";
import { order } from "../../db/models/orderModel.js";
import{ manager } from "../../db/models/managerModel.js"
import { user } from "../../db/models/userModel.js";

export const adminGetAllTurfs = async (req, res) => {
       try {
           const allTurfs = await turf.find();
           res.json({ allTurfs });
        } catch (error) {
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
              res.status(500).json({ msg: "Internal Server Error", ts: "error" });
      }
};


export const deleteManager = async (req, res) => {
       const { managerId } = req.body;
       if (!managerId) return res.status(400).json({ msg: "Manager ID is required", ts: "error" });
            try {
                const result = await manager.findByIdAndDelete(managerId);
                if (!result) return res.status(404).json({ msg: "Manager not found", ts: "error" });
                return res.status(200).json({ msg: "Manager successfully deleted", ts: "success" });
            } catch (error) {
              return res.status(500).json({ msg: "Server error", ts: "error" });
            }
};