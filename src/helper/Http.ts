export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export class Http {
  static async request(method: Method = Method.GET, url: string = "", data = {}) {
    if (method === Method.GET) {
      return await fetch(url, {
        method: method,
        mode: "cors",
      });
    }

    return await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
