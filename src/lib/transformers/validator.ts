import type {ZodObject, z} from "zod";

export default class StructureValidatorStream<T extends ZodObject<any>> extends TransformStream<object, z.infer<T>> {
    constructor(schema: T) {
        super({
            async transform(chunk: object, controller: TransformStreamDefaultController) {
                const result = schema.safeParse(chunk);
                if (!result.success) {
                    console.error(result.error);
                    return;
                }
                controller.enqueue(result.data);
            }
        });
    }
}
