import { order } from "../../db/models/orderModel.js";
import { turf } from "../../db/models/turfModel.js";

// manager get assigned turfs
export const managerAssignedTurfs = async (req, res) => { 
      try { 
           const userId = req.user.id;
           const assignedTurfs = await turf.find({ assignedTo: userId });
        res.json({ assignedTurfs }); 
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", ts: "error" });
      }
};

// manager get assigned turfs orders
export const managerAssignedTurfsOrders = async (req, res) => {
      try {
          const userId = req.user.id;
          const assignedTurfsOrders = await order.find({ managerId: userId });
        res.json({ assignedTurfsOrders });
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", ts: "error" });
      }
};


// deleteorder
export const deleteOrder = async (req, res) => {      
       const { orderId } = req.body
       if (!orderId) return res.status(400).json({ msg: "Order ID is required", ts: "error" });

      try {
          const result = await order.findByIdAndDelete(orderId);
          if (!result) return res.status(404).json({ msg: "Order not found", ts: "error" });    
        return res.status(200).json({ msg: "Order successfully deleted", ts: "success" });
      } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ msg: "Server error", ts: "error" });
      }
};


// cancelorder
export const cancelOrder = async (req, res) => {
       
       const { orderId } = req.body;
       if (!orderId)  return res.status(400).json({ msg: "Order ID is required", ts: "error" });

       try {
           const result = await order.findByIdAndUpdate(orderId,{ status: 'cancelled' },{ new: true });
           if (!result) return res.status(404).json({ msg: "Order not found", ts: "error" });
         return res.status(200).json({ msg: "Order successfully cancelled", ts: "success" });
       } catch (error) {
         return res.status(500).json({ msg: "Server error", ts: "error" });
       }
};