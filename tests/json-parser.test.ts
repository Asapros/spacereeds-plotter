import { describe, it, expect } from 'vitest';
import {assertTransformation, drainStream, queuedStream} from "./mock-streams";
import JsonParserStream from "$lib/stream/json-parser";
import {faker} from "@faker-js/faker";

describe("JsonParserStream", () => {
    it("parses valid JSON strings", async () => {
        const data: object[] = [
            {"word": faker.lorem.word()},
            {"number": faker.number.float()}
        ];
        const input: string[] = data.map(object => JSON.stringify(object));
        await assertTransformation(input, [new JsonParserStream()], data);
    });

    it("ignores invalid JSON strings", async () => {
        const data: string[] = [
            "{" + faker.lorem.word()
        ];
        await assertTransformation(data, [new JsonParserStream()], []);
    });
});
