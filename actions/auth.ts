"use server";

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  try {
    console.log(data);

    return {
      success: true,
      message: "Login Successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    console.log(data);

    return {
      success: true,
      message: "Registration Successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Registration Failed",
    };
  }
}

export async function logoutUser() {
  return {
    success: true,
  };
}