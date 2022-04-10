class API {
  constructor(){
  }
  static async get(url: string, options?: RequestInit | undefined) {
    fetch(url, {
      method: 'GET'
    })
  }
}