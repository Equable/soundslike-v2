interface ResponseData {
  [key: number]: any;
  [key: string]: any;
}

class APIService {
  constructor() {}

  static async get(
    url: string,
    options?: RequestInit,
    token?: string
  ): Promise<ResponseData> {
    return fetch(
      url,
      options || {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("There's an issue with spotify API");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default APIService