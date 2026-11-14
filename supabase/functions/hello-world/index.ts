import { withSupabase } from 'npm:@supabase/server@1';

export default {
  fetch: withSupabase(
    { auth: ['publishable', 'secret'] },
    async (request, context) => {
      const payload = await request.json().catch(() => ({}));
      const name =
        typeof payload?.name === 'string' && payload.name.trim()
          ? payload.name.trim()
          : 'Supabase';

      return Response.json({
        message: `Hello, ${name}!`,
        authMode: context.authMode,
      });
    },
  ),
};
