import {API_URL} from "@/config/config";

export async function request(endpoint: string, server_name: string, meta: Record<string, any> = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server: server_name,
        ...meta
      })
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  try {
    return await response.json();
  }
  catch (error) {
    throw new Error('Failed to parse JSON');
  }
}
