import {z, ZodObject} from "zod";

export const GPS_ERROR =  0b00001;
export const LORA_ERROR = 0b00010;
export const IMU_ERROR =  0b00100;
export const SD_ERROR =   0b01000;
export const BMP_ERROR =  0b10000;

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