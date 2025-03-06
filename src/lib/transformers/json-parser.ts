export default class JsonParserStream extends TransformStream<string, object> {
    constructor() {
        super({
            async transform(chunk: string, controller: TransformStreamDefaultController) {
                let result: object;
                try {
                    result = JSON.parse(chunk);
                } catch (error) { return; }
                controller.enqueue(result);
            }
        });
    }
}
