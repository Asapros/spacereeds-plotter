export default class JsonParserStream extends TransformStream<string, object> {
    constructor(onError: (chunk: string) => void = () => {}) {
        super({
            async transform(chunk: string, controller: TransformStreamDefaultController) {
                let result: object;
                try {
                    result = JSON.parse(chunk);
                } catch (error) {
                    onError(chunk);
                    return;
                }
                controller.enqueue(result);
            }
        });
    }
}
