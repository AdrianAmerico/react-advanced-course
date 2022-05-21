import { HttpPostClient, HttpPostParams } from "../http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../http/http-response";

export class HttPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.OK,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
