// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { env, assertAuthEnv, assertAdminEnv } from '../env';

export const getSupabaseAuth = () => {
  assertAuthEnv();
  return createClient(env.url, env.anon);
};
export const getSupabaseAdmin = () => {
  assertAdminEnv();
  return createClient(env.url, env.service);
};
export const asUserClient = (token: string) => {
  assertAuthEnv();
  return createClient(env.url, env.anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
};

const key = env.service ?? env.anon;
if (!env.url || !key) {
  throw new Error(
    'SUPABASE_URL e alguma chave (SERVICE_ROLE ou ANON) são obrigatórias'
  );
}

export const supabase = createClient(env.url, key);

export type CategoryType = {
  id: string;
  name: string;
  userid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Category = {
  id: string;
  user_id: string | null; // pode ser null se você não estiver usando auth agora
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Transaction = {
  id: string;
  user_id: string | null; // pode ser null se você não estiver usando auth agora
  category_id: string;
  category?: Category;
  name: string;
  description: string | null;
  amount: number;
  date: string; // ISO 8601
  created_at: string;
  updated_at: string;
  deleted_at: string | null; // para soft delete
};
