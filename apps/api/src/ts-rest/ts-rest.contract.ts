import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export interface ExampleType {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published: boolean | null;
  tags: string[] | null;
}

const ExampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string().nullable(),
  published: z.boolean(),
  tags: z.array(z.string()),
});

const c = initContract();

export const tsRestApi = c.router(
  {
    // Create
    createExample: {
      method: 'POST',
      path: '/api/ts-rest',
      responses: {
        // IMPORTANT: different ways of doing this
        // 201: ExampleSchema,
        201: c.type<ExampleType>(),
        400: z.object({ message: z.string() }),
      },
      // IMPORTANT: different ways of doing this
      // body: z.object({
      //   title: z.string().transform((v) => v.trim()),
      //   content: z.string(),
      //   published: z.boolean().optional(),
      //   description: z.string().optional(),
      // }),
      // body: c.type<{
      //   title: string;
      //   description: string | null;
      //   content: string | null;
      //   published: boolean;
      //   tags: string[];
      // }>(),
      body: c.type<Omit<ExampleType, 'id'>>(),
      summary: 'Create a example',
      metadata: { roles: ['user'] } as const,
    },

    // Read
    getExample: {
      method: 'GET',
      path: `/api/ts-rest/:id`,
      responses: {
        200: ExampleSchema,
        404: z.null(),
      },
      query: null,
      summary: 'Get a example by id',
      metadata: { roles: ['guest', 'user'] } as const,
    },

    // Update
    updateExample: {
      method: 'PATCH',
      path: `/api/ts-rest/:id`,
      responses: { 200: ExampleSchema },
      body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
        description: z.string().optional(),
      }),
      summary: 'Update a example',
      metadata: {
        roles: ['user'],
        resource: 'example',
        identifierPath: 'params.id',
      } as const,
    },

    // Delete
    deleteExample: {
      method: 'DELETE',
      path: `/api/ts-rest/:id`,
      responses: {
        200: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
      body: null,
      summary: 'Delete a example',
      metadata: {
        roles: ['user'],
        resource: 'example',
        identifierPath: 'params.id',
      } as const,
    },

    // List
    getExamples: {
      method: 'GET',
      path: '/api/ts-rest',
      responses: {
        200: z.object({
          examples: ExampleSchema.array(),
          count: z.number(),
          skip: z.number(),
          take: z.number(),
        }),
      },
      query: z.object({
        take: z.string().transform(Number),
        skip: z.string().transform(Number),
        search: z.string().optional(),
      }),
      summary: 'Get all examples',
      headers: z.object({
        'x-pagination': z.coerce.number().optional(),
      }),
      metadata: { roles: ['guest', 'user'] } as const,
    },
  },
  {
    baseHeaders: z.object({
      'x-api-key': z.string(),
    }),
  },
);
