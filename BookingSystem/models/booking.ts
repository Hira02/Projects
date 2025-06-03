export interface Booking{
    id: string,
    slotId: string,
    userId: string,
    amount: number,
    paymentStatus: 'SUCCESS' | 'FAILED'
}