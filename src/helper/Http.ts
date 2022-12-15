export class Http {
  static async request(method: "GET" | "POST" | "PUT" | "DELETE" = "GET", url: string = "", data = {}) {
    const response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}
