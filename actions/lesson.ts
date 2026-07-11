"use server";

export async function getLessons(courseId: string) {
  return [];
}

export async function createLesson(data: any) {
  console.log(data);

  return {
    success: true,
  };
}

export async function updateLesson(id: string, data: any) {
  console.log(id, data);

  return {
    success: true,
  };
}

export async function deleteLesson(id: string) {
  console.log(id);

  return {
    success: true,
  };
}