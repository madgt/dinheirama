import { Elysia } from 'elysia';
import { getSupabaseAuth, asUserClient } from '../lib/supabase';

export const authPlugin = new Elysia({ name: 'plugin:auth' }).derive(
  async ({ request }) => {
    const auth = request.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token) return { user: null, token: '', asUser: null };

    const { data, error } = await getSupabaseAuth().auth.getUser(token);
    if (error || !data?.user) return { user: null, token: '', asUser: null };

    return { user: data.user, token, asUser: asUserClient(token) };
  }
);
