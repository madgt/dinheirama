import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { env } from './env';
import { authPublic } from './routes/auth.public';
import { adminUsers } from './routes/admin.users';
import { me } from './routes/me';
import { categoriesRoutes } from './routes/categories';
import { transactionsRoutes } from './routes/transactions';
import { cateogryTypesRoutes } from './routes/categoryTypes';

export const app = new Elysia()
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
      credentials: true,
    })
  )
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Dinheirama API',
          description: 'Auth passwordless + orçamento',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            adminKey: { type: 'apiKey', in: 'header', name: 'x-admin-key' },
          },
        },
        tags: [
          { name: 'Auth', description: 'Login passwordless (OTP/Magic link)' },
          { name: 'Me', description: 'Rotas autenticadas do usuário' },
          { name: 'Admin', description: 'Administração (service role)' },
          { name: 'Categories', description: 'Categorias de Transações' },
        ],
      },
    })
  )
  .group('/api', (app) =>
    app.use(categoriesRoutes).use(transactionsRoutes).use(cateogryTypesRoutes)
  )
  .get('/health', () => ({ ok: true }))
  .use(authPublic)
  .use(adminUsers)
  .use(me)
  .listen(env.port);

console.log(`API on http://localhost:${env.port}`);
