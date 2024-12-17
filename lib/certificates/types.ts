export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateNumber: string;
  issuedAt: string;
  metadata: {
    userName: string;
    courseName: string;
    instructorName: string;
    completionDate: string;
  };
}

export interface CreateCertificateData {
  userId: string;
  courseId: string;
  userName: string;
  courseName: string;
  instructorName: string;
}