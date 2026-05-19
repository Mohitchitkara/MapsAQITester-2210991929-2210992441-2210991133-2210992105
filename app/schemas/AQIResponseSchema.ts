import { z } from "zod";

export const AQIResponseSchema = z.object({
    status: z.string(),

    data: z.object({
        aqi: z.number(),
        idx: z.number(),

        attributions: z.array(
            z.object({
                url: z.string(),
                name: z.string(),
                logo: z.string().optional(),
            }),
        ),

        city: z.object({
            geo: z.tuple([z.number(), z.number()]),
            name: z.string(),
            url: z.string(),
            location: z.string(),
        }),

        dominentpol: z.string(),

        iaqi: z.object({
            co: z.object({
                v: z.number(),
            }),

            dew: z.object({
                v: z.number(),
            }),

            h: z.object({
                v: z.number(),
            }),

            no2: z.object({
                v: z.number(),
            }),

            o3: z.object({
                v: z.number(),
            }),

            p: z.object({
                v: z.number(),
            }),

            pm10: z.object({
                v: z.number(),
            }),

            pm25: z.object({
                v: z.number(),
            }),

            so2: z.object({
                v: z.number(),
            }),

            t: z.object({
                v: z.number(),
            }),

            w: z.object({
                v: z.number(),
            }),
        }),

        time: z.object({
            s: z.string(),
            tz: z.string(),
            v: z.number(),
            iso: z.string(),
        }),

        forecast: z.object({
            daily: z.object({
                pm10: z.array(
                    z.object({
                        avg: z.number(),
                        day: z.string(),
                        max: z.number(),
                        min: z.number(),
                    }),
                ),

                pm25: z.array(
                    z.object({
                        avg: z.number(),
                        day: z.string(),
                        max: z.number(),
                        min: z.number(),
                    }),
                ),

                uvi: z.array(
                    z.object({
                        avg: z.number(),
                        day: z.string(),
                        max: z.number(),
                        min: z.number(),
                    }),
                ),
            }),
        }),

        debug: z.object({
            sync: z.string(),
        }),
    }),
});

export type AQIResponse = z.infer<typeof AQIResponseSchema>;
