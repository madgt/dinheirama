import { Elysia, t } from 'elysia';
import { getSupabaseAuth, asUserClient } from '../lib/supabase';

export const authPublic = new Elysia({
  name: 'routes:auth-public',
  prefix: '/auth',
})
  .post(
    '/signup',
    async ({ body, set }) => {
      const { email, redirectTo } = body as {
        email: string;
        redirectTo?: string;
      };
      if (!email) {
        set.status = 400;
        return { error: 'email obrigatório' };
      }

      const { error } = await getSupabaseAuth().auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: redirectTo },
      });
      if (error) {
        set.status = 400;
        return { error: error.message };
      }
      return { ok: true };
    },
    {
      detail: { tags: ['Auth'], summary: 'Cadastra Novo usuario' },
      body: t.Object({ email: t.String(), redirectTo: t.Optional(t.String()) }),
    }
  )
  .post(
    '/verify',
    async ({ body, set }) => {
      const {
        email,
        token,
        type = 'email',
        token_hash,
      } = body as {
        email?: string;
        token?: string;
        type?: 'email' | 'magiclink';
        token_hash?: string;
      };

      if (type === 'magiclink') {
        if (!token_hash) {
          set.status = 400;
          return { error: 'token_hash obrigatório' };
        }
        const { data, error } = await getSupabaseAuth().auth.verifyOtp({
          type: 'magiclink',
          token_hash,
        });
        if (error || !data?.session) {
          set.status = 401;
          return { error: error?.message || 'link inválido' };
        }
        const { access_token, user } = data.session;
        await asUserClient(access_token)
          .from('users')
          .upsert({ id: user.id, email: user.email ?? null });
        return { access_token, user: { id: user.id, email: user.email } };
      }

      if (!email || !token) {
        set.status = 400;
        return { error: 'email e token obrigatórios' };
      }
      const { data, error } = await getSupabaseAuth().auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      if (error || !data?.session) {
        set.status = 401;
        return { error: error?.message || 'OTP inválido' };
      }
      const { access_token, user } = data.session;
      await asUserClient(access_token)
        .from('users')
        .upsert({ id: user.id, email: user.email ?? null });
      return { access_token, user: { id: user.id, email: user.email } };
    },
    {
      detail: { tags: ['Auth'], summary: 'Confirma OTP ou Magic Link' },
      body: t.Object({
        type: t.Optional(t.Union([t.Literal('email'), t.Literal('magiclink')])),
        email: t.Optional(t.String()),
        token: t.Optional(t.String()),
        token_hash: t.Optional(t.String()),
      }),
      response: {
        200: t.Object({
          access_token: t.String(),
          user: t.Object({ id: t.String(), email: t.Nullable(t.String()) }),
        }),
      },
    }
  );
