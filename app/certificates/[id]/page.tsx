import { getCertificate } from '@/lib/certificates/api';
import { notFound } from 'next/navigation';
import { Award } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface CertificatePageProps {
  params: {
    id: string;
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const certificate = await getCertificate(params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
          <div className="text-center">
            <Award className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold">Sertifikat Kelulusan</h1>
            <p className="mt-2 text-muted-foreground">
              Diberikan kepada:
            </p>
            <p className="mt-4 text-2xl font-semibold">
              {certificate.metadata.userName}
            </p>
            <p className="mt-6 text-muted-foreground">
              Atas keberhasilannya menyelesaikan kursus:
            </p>
            <p className="mt-2 text-xl font-semibold">
              {certificate.metadata.courseName}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Instruktur: {certificate.metadata.instructorName}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tanggal: {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', {
                locale: id,
              })}
            </p>
            <p className="mt-4 text-sm font-medium">
              No. Sertifikat: {certificate.certificateNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}