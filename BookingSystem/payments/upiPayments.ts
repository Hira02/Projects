import {IPaymentStrategy} from "../payments/paymentStrategy"
export class UpiPayments implements IPaymentStrategy { 
    async pay(amount: number, userId: string): Promise<'SUCCESS' | 'FAILED'> {
        console.log(`Processing UPI payment for user ${userId} if $${amount}`)
        return new Promise(resolve => setTimeout(() => { resolve('SUCCESS'), 1000}))
    }
}