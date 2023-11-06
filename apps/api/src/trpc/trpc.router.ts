import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}
  // constructor(
  //   private readonly trpc: TrpcService,
  //   private readonly userService: UserService, // injected service
  // ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Default tRPC name`}`,
        };
      }),

    // getUsers: this.trpc.procedure
    // .input(
    //   z.object({
    //     // name: z.string(),
    //   }),
    // )
    // .query(async ({ input }) => {
    //   const { name } = input;
    //   return await this.userService.getUsers(name); // random example showing you how you can now use dependency injection
    // }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      // `/trpc`,
      `/api/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
