import { turf } from "../db/models/turfModel.js";
import { turfSlot } from "../db/models/turfTimeSlotsModel.js";
import { order } from "../db/models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const createSlots = async (req, res) => {
    const { key } = req.params;
    const secretKey = process.env.CREATESLOTS_SECRET_KEY;

    if (key !== secretKey) {
        return res.status(400).json({ msg: 'Invalid key', ts: 'error' });
    }

    try {
        const turfs = await turf.find();
        const currentDate = new Date().toISOString().split('T')[0];

        const orders = await order.find({
            bookingdate: {
                $gte: new Date(currentDate),
                $lt: new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1))
            }
        });

        const bookedSlotsMap = orders.reduce((map, { turfId, timeRange }) => {
            timeRange.forEach(range => map[`${turfId}-${range}`] = true);
            return map;
        }, {});

        const tasks = turfs.map(async ({ _id, slots }) => {
            const turfId = _id.toString();
            const existingSlots = await turfSlot.findOne({ turfId, date: currentDate });

            const availableSlots = slots.filter(slot => !bookedSlotsMap[`${turfId}-${slot.timeRange}`]);
            const bookedSlots = slots.filter(slot => bookedSlotsMap[`${turfId}-${slot.timeRange}`]);

            if (existingSlots) {
                const newAvailableSlots = availableSlots.filter(slot => 
                    !existingSlots.slots.some(existingSlot => existingSlot.timeRange === slot.timeRange)
                );

                if (newAvailableSlots.length > 0) {
                    await turfSlot.updateOne(
                        { turfId, date: currentDate },
                        { $push: { slots: { $each: newAvailableSlots } } }
                    );
                }

                if (bookedSlots.length > 0) {
                    await turfSlot.updateOne(
                        { turfId, date: currentDate },
                        { $set: { 'slots.$[elem].status': 'booked' } },
                        { arrayFilters: [{ 'elem.timeRange': { $in: bookedSlots.map(slot => slot.timeRange) } }] }
                    );
                }
            } else {
                if (availableSlots.length > 0 || bookedSlots.length > 0) {
                    const newSlots = [...availableSlots, ...bookedSlots.map(slot => ({ ...slot, status: 'booked' }))];
                    await new turfSlot({ turfId, date: currentDate, slots: newSlots }).save();
                }
            }
        });

        await Promise.all(tasks);

        res.status(201).json({ msg: "Slots created successfully", ts: "success" });
    } catch (error) {
        res.status(500).json({ msg: "Error creating or updating slots", ts: "error" });
    }
};
