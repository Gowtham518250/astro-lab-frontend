"use server";

export async function addFavorite(courseId: string) {
  console.log(courseId);

  return {
    success: true,
  };
}

export async function removeFavorite(courseId: string) {
  console.log(courseId);

  return {
    success: true,
  };
}

export async function getFavorites() {
  return [];
}