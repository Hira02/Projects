import { IPaymentStrategy } from "./paymentStrategy";
import { UpiPayments } from "./upiPayments";

export class PaymentFactory {
    private static strategies: Record<string, IPaymentStrategy> = {
        UPI: new UpiPayments()
        //CARD: new CardPayments()  easy extend
    }
    public static getStrategy(type: string): IPaymentStrategy {
        const strategy = PaymentFactory.strategies[type.toUpperCase()];
        if(!strategy){
            throw new Error(`Unsupported payment method: ${type}`)
            
        }
        return strategy
    }
}