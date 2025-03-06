import LineAggregatorStream from "$lib/transformers/aggregator";
import { describe, it, expect } from 'vitest';
import {assertTransformation, drainStream, queuedStream} from "./mock-streams";


describe("LineAggregatorStream", () => {
    it("should split input by newlines", async () =>
        await assertTransformation(["A\nB\nC\n"], [new LineAggregatorStream()], ["A", "B", "C"])
    );

    it("should buffer incomplete lines", async () => {
        await assertTransformation(["A", "B\n", "C"], [new LineAggregatorStream()], ["AB"])
    });
});
