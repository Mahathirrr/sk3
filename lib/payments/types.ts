export type PaymentStatus = 
  | 'pending'
  | 'success'
  | 'failed'
  | 'expired'
  | 'refunded';

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: PaymentStatus;
  paymentToken: string;
  paymentUrl: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  userId: string;
  courseId: string;
  amount: number;
}