"use server";

export async function getCourses() {
  return [];
}

export async function getCourse(id: string) {
  return null;
}

export async function createCourse(data: any) {
  console.log(data);

  return {
    success: true,
  };
}

export async function updateCourse(id: string, data: any) {
  console.log(id, data);

  return {
    success: true,
  };
}

export async function deleteCourse(id: string) {
  console.log(id);

  return {
    success: true,
  };
}