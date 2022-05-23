import faker from "@faker-js/faker";
import axios from "axios";

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockedAxiosResult = {
    data: {},
    status: faker.random.numeric(),
  };

  mockedAxios.post.mockResolvedValue(mockedAxiosResult);
  return mockedAxios;
};
