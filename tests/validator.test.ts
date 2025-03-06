import { describe, it, expect } from 'vitest';
import {assertTransformation} from "./mock-streams";
import {z} from "zod";
import {faker} from "@faker-js/faker";
import StructureValidatorStream from "$lib/transformers/validator";

const ExampleSchema = z.object({
    key: z.string(),
    number: z.number()
})

describe("StructureValidatorStream", () => {
    it("should remove excess fields according to schema", async () => {
        const input = {key: faker.lorem.word(), number: faker.number.float(), excess: faker.lorem.word()}
        const expected: z.infer<typeof ExampleSchema> | undefined = ExampleSchema.safeParse(input).data;
        await assertTransformation([input], [new StructureValidatorStream(ExampleSchema)], [expected])
    });
    it("should not pass schematically invalid data", async () => {
        const type_fallacy = {key: faker.number.float(), number: faker.number.float()}
        await assertTransformation([type_fallacy], [new StructureValidatorStream(ExampleSchema)], []);
        const structure_fallacy = {key: faker.lorem.word()}
        await assertTransformation([structure_fallacy], [new StructureValidatorStream(ExampleSchema)], []);
    });
});