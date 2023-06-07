/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router, mergeRouters } from '../trpc';
import { postRouter } from './post';

import * as trpc from '@trpc/server';
import { transformer } from '~/utils/transformer';

export const legacyRouter = trpc
  .router()
  // With transformer, procedures fail to run as there are "two transformers"
  // .transformer(transformer)
  .query('health', {
    resolve() {
      return 'yay!';
    },
  })
  .interop();

export const mainRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
});

export const appRouter = mergeRouters(legacyRouter, mainRouter);

export type AppRouter = typeof appRouter;
