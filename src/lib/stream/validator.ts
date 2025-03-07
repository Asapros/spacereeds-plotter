import {type ZodObject, type z, ZodError} from "zod";

export default class StructureValidatorStream<T extends ZodObject<any>> extends TransformStream<object, z.infer<T>> {
    constructor(schema: T, onError: (error: ZodError) => void = () => {}) {
        super({
            async transform(chunk: object, controller: TransformStreamDefaultController) {
                const result = schema.safeParse(chunk);
                if (!result.success) {
                    onError(result.error);
                    return;
                }
                controller.enqueue(result.data);
            }
        });
    }
}
