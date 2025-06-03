export interface IPaymentStrategy {
    pay(amount: number,  userId: string): Promise<'SUCCESS'| 'FAILED'>;
}