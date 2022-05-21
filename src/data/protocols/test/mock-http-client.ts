import { HttpPostClient, HttpPostParams } from "../http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../http/http-response";

export class HttPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}