import { SlotService } from "./slotService";
import { PaymentFactory } from "../payments/paymentFactory";
import { Booking } from "../models/booking";
import { v4 as uuidv4} from "uuid"

export class BookingService { 
    private bookings: Booking[] = []
    constructor(private slotService: SlotService){}
    public async bookSlot(
        slotId: string,
        userId: string,
        paymentMethod: string
    ): Promise<Booking | string> {
        const slot = this.slotService.getSlotById(slotId)
        if(!slot || slot.isBooked){
            return "Slot unavailable"
        }
        const baseAmount = 100
        const discount = baseAmount * (slot.discount / 100)
        const finalAmount = baseAmount - discount
        let paymentStatus: 'SUCCESS' | 'FAILED'
        try {
            const strategy = PaymentFactory.getStrategy(paymentMethod)
            paymentStatus = await strategy.pay(finalAmount, userId)

        }catch(err){
            return (err as Error).message
        }
        if(paymentStatus === 'SUCCESS'){
            this.slotService.markSlotBooked(slotId)
            const booking: Booking  = {
                id: uuidv4(),
                slotId,
                userId,
                amount: finalAmount,
                paymentStatus
            }
            this.bookings.push(booking)
            return booking
        }
        return " Payment Failed"
    }
}