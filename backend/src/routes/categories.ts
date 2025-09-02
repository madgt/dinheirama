import { Elysia, t } from 'elysia';
import { supabase, type Category } from '../lib/supabase';

export const categoriesRoutes = new Elysia({ prefix: '/categories' })
  // GET /categories -> lista todas (com ordenação simples)
  .get(
    '/',
    async ({ error }) => {
      const { data, error: err } = await supabase
        .from('categories')
        .select(
          `
          id,
          name,
          categoryType: category_types(id, name)`
        )
        .is('deleted_at', null) // só as não deletadas
        .order('created_at', { ascending: false });

      if (err) return error(500, err.message);
      return data as Category[];
    },
    {
      detail: { tags: ['Categories'], summary: 'Retrieve all categories' },
    }
  )

  // GET /categories/:id -> uma categoria
  .get(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('categories')
        .select(
          `
          id,
          name,
          categoryType: category_types(id, name)`
        )
        .is('deleted_at', null) // só as não deletadas
        .eq('id', params.id)
        .single();

      if (err) return error(404, 'Categoria não encontrada');
      return data as Category;
    },
    {
      params: t.Object({ id: t.String() }),
      detail: { tags: ['Categories'], summary: 'Retrieve one category' },
    }
  )

  // Mark category as deleted (soft delete)
  // DELETE /categories/:id
  .delete(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('categories')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', params.id)
        .is('deleted_at', null) // só as não deletadas
        .select('*')
        .single();

      if (err) return error(404, 'Categoria não encontrada ou já deletada');
      else return { message: 'Categoria deletada com sucesso' };
      //return data as Category;
    },
    {
      params: t.Object({ id: t.String() }),
      detail: { tags: ['Categories'], summary: 'Delete a category' },
    }
  )

  // Create a new category
  // POST /categories -> cria uma categoria
  .post(
    '/',
    async ({ body, error }) => {
      const { data, error: err } = await supabase
        .from('categories')
        .insert({
          user_id: 'abc79702-0c85-47e8-ad4a-693c54594cc4',
          name: body.name,
          type: body.type,
          // user_id: 'mock-user-id'  // se quiser forçar um usuário fixo por enquanto
        })
        .select('*') // retorna o registro criado
        .single();

      if (err) return error(400, err.message);
      return data as Category;
    },
    {
      body: t.Object({
        user_id: t.Optional(t.String('abc79702-0c85-47e8-ad4a-693c54594cc4')), // opcional por enquanto
        name: t.String({ minLength: 1 }),
        type: t.Number({ minimum: 0, maximum: 2 }),
      }),
      detail: { tags: ['Categories'], summary: 'Create a new category' },
    }
  )

  //PATCH /categories/edit/:id -> atualiza uma categoria
  .patch(
    '/edit/:id',
    async ({ params, body, error }) => {
      // monte apenas os campos permitidos
      const patch: Record<string, any> = {};
      if (typeof body.name === 'string') patch.name = body.name;
      if (typeof body.type === 'number' && [0, 1, 2].includes(body.type)) {
        patch.type = body.type;
      }
      // opcional: atualiza o updated_at, se sua tabela tiver
      patch.updated_at = new Date().toISOString();

      // se não veio nada para atualizar, retorne 400
      if (Object.keys(patch).length === 1) {
        // só updated_at
        return error(400, 'Nenhum campo válido para atualizar');
      }

      const { data, error: err } = await supabase
        .from('categories')
        .update(patch)
        .eq('id', params.id)
        .is('deleted_at', null) // não permite atualizar deletadas (soft delete)
        .select('*')
        .single();

      if (err) return error(400, err.message);
      if (!data) return error(404, 'Categoria não encontrada');
      return data as Category;
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(
        t.Object({
          name: t.String({ minLength: 1 }),
          type: t.Number({ minimum: 0, maximum: 2 }),
        })
      ),
      detail: { tags: ['Categories'], summary: 'Update a category' },
    }
  );
