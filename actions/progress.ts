"use server";

export async function updateProgress(
  lessonId: string,
  completed: boolean
) {
  console.log(lessonId, completed);

  return {
    success: true,
  };
}

export async function getProgress(courseId: string) {
  return {
    percentage: 0,
  };
}