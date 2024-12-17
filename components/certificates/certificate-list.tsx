'use client';

import { useState } from 'react';
import { Certificate } from '@/lib/certificates/types';
import { CertificateCard } from './certificate-card';
import { useToast } from '@/components/ui/use-toast';

interface CertificateListProps {
  certificates: Certificate[];
}

export function CertificateList({ certificates }: CertificateListProps) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (certificate: Certificate) => {
    try {
      setIsDownloading(true);
      // TODO: Implement certificate PDF generation and download
      toast({
        title: 'Sertifikat berhasil diunduh',
        description: 'File sertifikat telah tersimpan di perangkat Anda.',
      });
    } catch (error) {
      toast({
        title: 'Gagal mengunduh sertifikat',
        description: 'Terjadi kesalahan saat mengunduh sertifikat.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async (certificate: Certificate) => {
    try {
      await navigator.share({
        title: \`Sertifikat \${certificate.metadata.courseName}\`,
        text: \`Saya telah menyelesaikan kursus \${certificate.metadata.courseName} di Skillopa!\`,
        url: \`https://skillopa.com/certificates/\${certificate.id}\`,
      });
    } catch (error) {
      // User cancelled or share not supported
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          onDownload={() => handleDownload(certificate)}
          onShare={() => handleShare(certificate)}
        />
      ))}
    </div>
  );
}