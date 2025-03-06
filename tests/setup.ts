import { faker } from '@faker-js/faker';
import { beforeAll } from "vitest";

beforeAll(() => {
    faker.seed(2137);
});
