import { withSupabase } from '@supabase/server';

const healthHandler = async (): Promise<Response> =>
  Response.json({ status: 'ok', service: 'supabase-server' });

const profileHandler = withSupabase(
  { auth: 'user' },
  async (_request, context) => {
    return Response.json({
      authenticated: true,
      user: context.userClaims,
    });
  },
);

/**
 * Fetch-standard request handler.
 *
 * Compatible with Deno, Bun, and worker-style runtimes.
 * A Node.js HTTP/framework adapter is intentionally not selected yet.
 */
const handler = {
  fetch: async (request: Request): Promise<Response> => {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return healthHandler();
    }

    if (request.method === 'GET' && url.pathname === '/api/v1/me') {
      return profileHandler(request);
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  },
};

export default handler;
