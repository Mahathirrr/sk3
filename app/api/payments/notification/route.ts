import { NextResponse } from 'next/server';
import { updatePaymentStatus } from '@/lib/payments/api';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Map Midtrans transaction status to our payment status
    const statusMap: Record<string, any> = {
      capture: 'success',
      settlement: 'success',
      pending: 'pending',
      deny: 'failed',
      cancel: 'failed',
      expire: 'expired',
      refund: 'refunded',
    };

    const paymentStatus = statusMap[data.transaction_status];
    if (!paymentStatus) {
      return NextResponse.json(
        { error: 'Invalid transaction status' },
        { status: 400 }
      );
    }

    // Update payment status in our database
    await updatePaymentStatus(data.order_id, paymentStatus);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}