import { RemoteAuthentication } from "./remote-authentication";
import { HttPostClientSpy } from "../../protocols/test/mock-http-client";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {

    const url = "any_url";
    const httpPostClientSpy = new HttPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
