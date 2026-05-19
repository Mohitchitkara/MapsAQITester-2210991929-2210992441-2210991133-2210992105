import { z } from "zod";

export const LocationResponseSchema = z.object({
    type: z.string(),
    features: z.array(
        z.object({
            type: z.string(),

            properties: z
                .object({
                    osm_type: z.string().optional(),
                    osm_id: z.number().optional(),
                    osm_key: z.string().optional(),
                    osm_value: z.string().optional(),

                    type: z.string().optional(),
                    name: z.string().optional(),

                    street: z.string().optional(),
                    housenumber: z.string().optional(),
                    locality: z.string().optional(),
                    district: z.string().optional(),
                    city: z.string().optional(),
                    county: z.string().optional(),
                    state: z.string().optional(),
                    country: z.string().optional(),
                    postcode: z.string().optional(),
                    countrycode: z.string().optional(),

                    extent: z.array(z.number()).optional(),
                })
                .loose(),

            geometry: z.object({
                type: z.string(),
                coordinates: z.tuple([z.number(), z.number()]),
            }),
        }),
    ),
});

export type LocationResponse = z.infer<typeof LocationResponseSchema>;
