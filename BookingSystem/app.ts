import express from "express"
import  { SlotService } from "../BookingSystem/services/slotService"
import { BookingService } from "./services/bookingService"
import { PaymentFactory } from "./payments/paymentFactory"
import { UpiPayments } from "./payments/upiPayments"

const app = express()
app.use(express.json())

const slotService = new SlotService()
const upiPayments = new UpiPayments()
const paymentFactory   = new PaymentFactory()
const bookingService = new BookingService(slotService)
app.get("/slots", (req, res) => {
    res.json(slotService.getAvailableSlots())
})
app.post("/book", async(req, res) => {
    const { slotId, userId} = req.body
    const result = await bookingService.bookSlot(slotId, userId, "UPI")
    res.json(result)
})
// app.get("/bookings/:userId", (req, res) => {
//     const bookings = bookingService.getBookingForUser
// })

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running at https://localhost:${PORT}`))