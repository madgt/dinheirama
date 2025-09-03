import { Elysia, t } from 'elysia';
import { supabase, type CategoryType } from '../lib/supabase';

export const cateogryTypesRoutes = new Elysia({ prefix: '/category-types' })

  // POST /transactions -> create one transaction
  .post(
    '/',
    async ({ body, error }) => {
      const { data, error: err } = await supabase
        .from('category_types')
        .insert({
          //test
          //user_id: abc79702-0c85-47e8-ad4a-693c54594cc4
          //category_id: c54d9e61-b72b-4233-b846-4f51db67c8e7
          user_id: body.user_id,
          name: body.description,
        })
        .select('*') // retorna o registro criado
        .single();

      if (err) return error(400, err.message);
      return data as CategoryType;
    },
    {
      body: t.Object({
        user_id: t.String(t.String('abc79702-0c85-47e8-ad4a-693c54594cc4')), // opcional por enquanto
        description: t.String({ minLength: 1 }),
        amount: t.String({ minLength: 1 }),
        category_id: t.String(t.String('c54d9e61-b72b-4233-b846-4f51db67c8e7')),
      }),
      detail: {
        tags: ['CategoryTypes'],
        summary: 'Create a new category Type',
      },
    }
  )
  // GET /categories -> lista todas (com ordenação simples)
  .get(
    '/',
    async ({ error }) => {
      const { data, error: err } = await supabase
        .from('category_types')
        .select(
          `id,
          name`
        )
        .is('deleted_at', null) // só as não deletadas
        .order('created_at', { ascending: false });

      if (err) return error(500, err.message);
      return data as CategoryType[];
    },
    {
      detail: {
        tags: ['CategoryTypes'],
        summary: 'Retrieve all category types',
      },
    }
  )

  // GET /categories/:id -> one transaction
  .get(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('category_types')
        .select(`name`)
        .is('deleted_at', null) // só as não deletadas
        .eq('id', params.id)
        .single();

      if (err) return error(500, err.message);
      return data as CategoryType;
    },
    {
      detail: {
        tags: ['CategoryTypes'],
        summary: 'Retrieve one category type',
      },
    }
  )
  //PATCH /categories/:id -> atualiza uma categoria
  .patch(
    '/:id',
    async ({ params, body, error }) => {
      // monte apenas os campos permitidos
      const patch: Record<string, any> = {};
      if (typeof body.name === 'string') patch.name = body.name;
      if (typeof body.id === 'string') {
        patch.id = body.id;
      }
      // opcional: atualiza o updated_at, se sua tabela tiver
      patch.updated_at = new Date().toISOString();

      // se não veio nada para atualizar, retorne 400
      if (Object.keys(patch).length === 1) {
        // só updated_at
        return error(400, 'No valid field to update');
      }

      const { data, error: err } = await supabase
        .from('category_types')
        .update(patch)
        .eq('id', params.id)
        .is('deleted_at', null) // não permite atualizar deletadas (soft delete)
        .select('*')
        .single();

      if (err) return error(400, err.message);
      if (!data) return error(404, 'Category Type not found');
      return data as CategoryType;
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(
        t.Object({
          name: t.String({ minLength: 1 }),
        })
      ),
      detail: { tags: ['CategoryTypes'], summary: 'Update a category type' },
    }
  )
  .delete(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('category_types')
        .update({ deleted_at: new Date().toISOString() }) // soft delete
        .eq('id', params.id)
        .is('deleted_at', null) // não permite deletar duas vezes
        .select('*')
        .single();

      if (err) return error(400, err.message);
      if (!data)
        return error(404, 'Category Type not found or already deleted');
      return { message: 'Category Type deleted' };
    },
    {
      params: t.Object({ id: t.String() }),
      detail: { tags: ['CategoryTypes'], summary: 'Delete a category type' },
    }
  );
