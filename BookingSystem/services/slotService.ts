import { Slot } from "../models/slots";
import { v4 as uuidv4} from "uuid";
export class SlotService{
    private slots: Slot[] = []
    constructor(){
        this.seedSlots();
    }
    private seedSlots(){
        const times = [['10:00', '11:00'], ['11:00', '12:00'], ['12:00', '13:00']]
        this.slots = times.map(([start, end], index) => ({
        id: uuidv4(),
        startTime: start,
        endTime: end,
        isBooked: false,
        discount: 10 * (index + 1) // % discount
    }));
    }

    public getAvailableSlots(): Slot[]{
        return this.slots.filter(slot => !slot.isBooked)
    }
    public getSlotById(slotId: string): Slot | undefined {
        return this.slots.find(s => s.id === slotId)
    }
    public markSlotBooked(slotId: string): boolean {
        const slot = this.getSlotById(slotId)
        if(slot && !slot.isBooked){
            slot.isBooked = true
            return true
        }
        return false
    }
}