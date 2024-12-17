import { supabase } from '@/lib/supabase/client';
import { Certificate, CreateCertificateData } from './types';

function generateCertificateNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return \`CERT-\${timestamp}-\${random}\`.toUpperCase();
}

export async function createCertificate(
  data: CreateCertificateData
): Promise<Certificate> {
  const certificateNumber = generateCertificateNumber();
  const issuedAt = new Date().toISOString();

  const { data: certificate, error } = await supabase
    .from('certificates')
    .insert({
      user_id: data.userId,
      course_id: data.courseId,
      certificate_number: certificateNumber,
      issued_at: issuedAt,
      metadata: {
        userName: data.userName,
        courseName: data.courseName,
        instructorName: data.instructorName,
        completionDate: issuedAt,
      },
    })
    .select()
    .single();

  if (error) throw error;
  return certificate;
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  const { data: certificate, error } = await supabase
    .from('certificates')
    .select()
    .eq('id', id)
    .single();

  if (error) return null;
  return certificate;
}

export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  const { data: certificates, error } = await supabase
    .from('certificates')
    .select()
    .eq('user_id', userId)
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return certificates;
}