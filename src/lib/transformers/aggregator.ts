export default class LineAggregatorStream extends TransformStream<string, string> {
    constructor() {
        let buffer = "";
        super({
            async transform(chunk: string, controller: TransformStreamDefaultController) {
                let terminationIndex: number = chunk.search("\n");
                if (terminationIndex === -1) {
                    buffer += chunk;
                    return;
                }
                controller.enqueue(buffer + chunk.substring(0, terminationIndex));
                buffer = "";
                await this.transform!(chunk.substring(terminationIndex + 1), controller);
            }
        });
    }
}