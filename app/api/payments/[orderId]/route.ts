import { NextResponse } from 'next/server';
import { getPaymentByOrderId } from '@/lib/payments/api';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const payment = await getPaymentByOrderId(params.orderId);
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment not found' },
      { status: 404 }
    );
  }
}