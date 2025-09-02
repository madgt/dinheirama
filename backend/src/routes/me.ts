import { Elysia, t } from 'elysia';
import { authPlugin } from '../plugins/auth';

export const me = new Elysia({ name: 'routes:me' }).use(authPlugin).get(
  '/me',
  ({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { error: 'unauthorized' };
    }
    return { id: user.id, email: user.email };
  },
  {
    detail: {
      tags: ['Me'],
      summary: 'Retorna o usuário autenticado',
      security: [{ bearerAuth: [] }], // exige Bearer JWT no Swagger
    },
    response: {
      200: t.Object({ id: t.String(), email: t.Nullable(t.String()) }),
    },
  }
);
