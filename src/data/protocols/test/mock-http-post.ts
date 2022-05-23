import faker from "@faker-js/faker";
import { HttpPostParams } from "../http";

const mockBody = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: mockBody,
});
