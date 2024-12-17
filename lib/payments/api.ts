import { supabase } from '@/lib/supabase/client';
import { Payment, CreatePaymentData, PaymentStatus } from './types';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

export async function createPayment(data: CreatePaymentData): Promise<Payment> {
  // Generate unique order ID
  const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Create Midtrans transaction
  const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Basic \${Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')}\`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: orderId,
        gross_amount: data.amount,
      },
      credit_card: {
        secure: true,
      },
    }),
  });

  const midtransData = await response.json();

  // Store payment record in database
  const { data: payment, error } = await supabase
    .from('payments')
    .insert({
      user_id: data.userId,
      course_id: data.courseId,
      amount: data.amount,
      status: 'pending',
      payment_token: midtransData.token,
      payment_url: midtransData.redirect_url,
      metadata: {
        order_id: orderId,
        midtrans_data: midtransData,
      },
    })
    .select()
    .single();

  if (error) throw error;
  return payment;
}

export async function updatePaymentStatus(
  orderId: string,
  status: PaymentStatus
): Promise<Payment> {
  const { data: payment, error } = await supabase
    .from('payments')
    .update({ status })
    .eq('metadata->order_id', orderId)
    .select()
    .single();

  if (error) throw error;

  // If payment is successful, create enrollment
  if (status === 'success') {
    const { error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: payment.user_id,
        course_id: payment.course_id,
        status: 'active',
        progress: 0,
      });

    if (enrollmentError) throw enrollmentError;
  }

  return payment;
}

export async function getPaymentByOrderId(orderId: string): Promise<Payment> {
  const { data: payment, error } = await supabase
    .from('payments')
    .select()
    .eq('metadata->order_id', orderId)
    .single();

  if (error) throw error;
  return payment;
}