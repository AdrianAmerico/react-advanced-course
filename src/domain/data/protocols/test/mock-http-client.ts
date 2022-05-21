import { HttpPostClient, HttpPostParams } from "../http/http-post-client";

export class HttPostClientSpy implements HttpPostClient {
  url?: string;
  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
