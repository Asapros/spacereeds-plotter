import {z, ZodObject} from "zod";

const CoordinateSchema = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number()
})

export const ReadingSchema = z.object({
    orientation: CoordinateSchema,
    position: CoordinateSchema,
    acceleration: CoordinateSchema,
    temperature: z.number(),
    internal_temperature: z.number(),
    pressure: z.number(),
    signal: z.number(),
    error: z.number(),
    message: z.string()
})

export type Reading = z.infer<typeof ReadingSchema>;