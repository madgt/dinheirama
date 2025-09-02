// src/env.ts
export const env = {
  url: process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '',
  anon:
    process.env.SUPABASE_ANON_KEY ||
    process.env.REACT_APP_SUPABASE_ANON_KEY ||
    '',
  service: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  port: Number(process.env.PORT ?? 3000),
  adminKey: process.env.ADMIN_API_KEY || '',
};

// checa só o necessário para auth “padrão” (anon)
export function assertAuthEnv() {
  const missing = [];
  if (!env.url) missing.push('SUPABASE_URL');
  if (!env.anon) missing.push('SUPABASE_ANON_KEY');
  if (missing.length)
    throw new Error(`Env faltando (auth): ${missing.join(', ')}`);
}

// quando (e se) usar rotas admin, chame esta:
export function assertAdminEnv() {
  const missing = [];
  if (!env.url) missing.push('SUPABASE_URL');
  if (!env.service) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (missing.length)
    throw new Error(`Env faltando (admin): ${missing.join(', ')}`);
}
