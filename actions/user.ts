"use server";

export async function getCurrentUser() {
  return null;
}

export async function updateProfile(data: any) {
  console.log(data);

  return {
    success: true,
  };
}

export async function deleteAccount() {
  return {
    success: true,
  };
}