"use server";

export async function generateCertificate(courseId: string) {
  console.log(courseId);

  return {
    success: true,
  };
}

export async function getCertificates() {
  return [];
}