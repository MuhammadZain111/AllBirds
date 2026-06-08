const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}