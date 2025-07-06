// src/modules/products/schemas/index.ts

import { z } from 'zod';

export const productFilterSchema = z.object({
  title: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  outofstock: z.boolean().optional(),
  sort: z.enum(['title', 'price', 'rating', 'createdAt', 'discount']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});
/*
You’re creating a TypeScript type (ProductFilterValues) by extracting it from your Zod schema (productFilterSchema).

⸻

💡 Why Use This?

Because now you only define your fields once (in Zod schema), and use the same structure for:
	•	✅ Form validation
	•	✅ Backend data parsing
	•	✅ TypeScript types for autocompletion & safety
This tells TypeScript: “Please infer the TypeScript type from this Zod schema.”

*/
export type ProductFilterValues = z.infer<typeof productFilterSchema>;