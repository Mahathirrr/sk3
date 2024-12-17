'use client';

import { Certificate } from '@/lib/certificates/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface CertificateCardProps {
  certificate: Certificate;
  onDownload?: () => void;
  onShare?: () => void;
}

export function CertificateCard({
  certificate,
  onDownload,
  onShare,
}: CertificateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{certificate.metadata.courseName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Instruktur: {certificate.metadata.instructorName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Diterbitkan:{' '}
              {format(new Date(certificate.issuedAt), 'dd MMMM yyyy', {
                locale: id,
              })}
            </p>
            <p className="mt-2 text-sm font-medium">
              No. Sertifikat: {certificate.certificateNumber}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
          Bagikan
        </Button>
        <Button
          variant="default"
          size="sm"
          className="gap-2"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
          Unduh
        </Button>
      </CardFooter>
    </Card>
  );
}