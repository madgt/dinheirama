import { Elysia, t } from 'elysia';
import { getSupabaseAdmin } from '../lib/supabase';
import { env } from '../env';

const requireAdmin = ({ request, set }: any) => {
  const key = request.headers.get('x-admin-key') || '';
  if (!env.adminKey || key !== env.adminKey) {
    set.status = 403;
    throw new Error('forbidden');
  }
};

export const adminUsers = new Elysia({
  name: 'routes:admin-users',
  prefix: '/admin',
})
  .guard({ beforeHandle: requireAdmin })
  .post(
    '/users',
    async ({ body, set }) => {
      const { email, sendInvite = true } = body as {
        email: string;
        sendInvite?: boolean;
      };
      if (!email) {
        set.status = 400;
        return { error: 'email obrigatório' };
      }

      if (sendInvite) {
        const { data, error } =
          await getSupabaseAdmin().auth.admin.inviteUserByEmail(email);
        if (error) {
          set.status = 400;
          return { error: error.message };
        }
        return { invited: true, user: data.user };
      }
      const { data, error } = await getSupabaseAdmin().auth.admin.createUser({
        email,
        email_confirm: true,
      });
      if (error) {
        set.status = 400;
        return { error: error.message };
      }
      return { created: true, user: data.user };
    },
    {
      detail: {
        tags: ['Admin'],
        summary: 'Cria/Convida um usuário (admin)',
        security: [{ adminKey: [] }], // Header x-admin-key no Swagger
      },
      body: t.Object({
        email: t.String(),
        sendInvite: t.Optional(t.Boolean()),
      }),
      response: {
        200: t.Union([
          t.Object({ invited: t.Literal(true), user: t.Any() }),
          t.Object({ created: t.Literal(true), user: t.Any() }),
        ]),
      },
    }
  );
