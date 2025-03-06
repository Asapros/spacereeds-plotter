import { expect } from "vitest";

export async function drainStream<T>(stream: ReadableStream<T>): Promise<T[]> {
    const reader = stream.getReader();
    const result: T[] = [];

    while (true) {
        const { value, done } = await reader.read();
        if (done) return result;

        result.push(value);
    }
}

export function queuedStream<T>(messages: T[]): ReadableStream {
    return new ReadableStream<T>({
        start(controller: ReadableStreamDefaultController<T>) {
            for (const message of messages) {
                controller.enqueue(message);
            }
            controller.close()
        }
    })
}

export async function assertTransformation(input: any[], transformers: TransformStream[], output: any[]) {
    let stream = queuedStream(input);
    for (const transformer of transformers) {
        stream = stream.pipeThrough(transformer)
    }
    expect(await drainStream(stream)).toEqual(output)
}