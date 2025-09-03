import { Elysia, t } from 'elysia';
import { supabase, type Transaction } from '../lib/supabase';

export const transactionsRoutes = new Elysia({ prefix: '/transactions' })

  // POST /transactions -> create one transaction
  .post(
    '/',
    async ({ body, error }) => {
      const { data, error: err } = await supabase
        .from('transactions')
        .insert({
          //test
          //user_id: abc79702-0c85-47e8-ad4a-693c54594cc4
          //category_id: c54d9e61-b72b-4233-b846-4f51db67c8e7
          user_id: body.user_id,
          description: body.description,
          amount: body.amount,
          date: body.date,
          category_id: body.category_id, //
        })
        .select('*') // retorna o registro criado
        .single();

      if (err) return error(400, err.message);
      return data as Transaction;
    },
    {
      body: t.Object({
        user_id: t.String(t.String('abc79702-0c85-47e8-ad4a-693c54594cc4')), // opcional por enquanto
        description: t.String({ minLength: 1 }),
        amount: t.String({ minLength: 1 }),
        date: t.String({ minLength: 6 }),
        category_id: t.String(t.String('c54d9e61-b72b-4233-b846-4f51db67c8e7')),
      }),
      detail: { tags: ['Transactions'], summary: 'Create a new transaction' },
    }
  )
  // GET /categories -> lista todas (com ordenação simples)
  .get(
    '/',
    async ({ error }) => {
      const { data, error: err } = await supabase
        .from('transactions')
        .select(
          `
          id,
          description,
          amount,
          date,
          category:categories(id,name)`
        )
        .is('deleted_at', null) // só as não deletadas
        .order('created_at', { ascending: false });

      if (err) return error(500, err.message);
      return data as Transaction[];
    },
    {
      detail: { tags: ['Transactions'], summary: 'Retrieve all transactions' },
    }
  )

  // GET /categories/:id -> one transaction
  .get(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('transactions')
        .select(
          `
          id,
          description,
          amount,
          date,
          category:categories(id,name)`
        )
        .is('deleted_at', null) // só as não deletadas
        .eq('id', params.id)
        .single();

      if (err) return error(500, err.message);
      return data as Transaction;
    },
    {
      detail: { tags: ['Transactions'], summary: 'Retrieve one transactions' },
    }
  )
  //PATCH /categories/:id -> atualiza uma categoria
  .patch(
    '/edit/:id',
    async ({ params, body, error }) => {
      // monte apenas os campos permitidos
      const patch: Record<string, any> = {};
      if (typeof body.description === 'string')
        patch.description = body.description;
      if (typeof body.amount === 'string') {
        patch.amount = body.amount;
      }
      if (typeof body.category_id === 'string') {
        patch.category_id = body.category_id;
      }
      if (typeof body.date === 'string') {
        patch.date = new Date(body.date);
      }
      // opcional: atualiza o updated_at, se sua tabela tiver
      patch.updated_at = new Date().toISOString();

      // se não veio nada para atualizar, retorne 400
      if (Object.keys(patch).length === 1) {
        // só updated_at
        return error(400, 'No valid field to update');
      }

      const { data, error: err } = await supabase
        .from('transactions')
        .update(patch)
        .eq('id', params.id)
        .is('deleted_at', null) // não permite atualizar deletadas (soft delete)
        .select('*')
        .single();

      if (err) return error(400, err.message);
      if (!data) return error(404, 'Transaction not found');
      return data as Transaction;
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(
        t.Object({
          description: t.String({ minLength: 1 }),
          amount: t.String({ minLength: 1 }),
          date: t.String({ minLength: 6 }),
          category_id: t.String(
            t.String('c54d9e61-b72b-4233-b846-4f51db67c8e7')
          ),
        })
      ),
      detail: { tags: ['Transactions'], summary: 'Update a transaction' },
    }
  )
  .delete(
    '/:id',
    async ({ params, error }) => {
      const { data, error: err } = await supabase
        .from('transactions')
        .update({ deleted_at: new Date().toISOString() }) // soft delete
        .eq('id', params.id)
        .is('deleted_at', null) // não permite deletar duas vezes
        .select('*')
        .single();

      if (err) return error(400, err.message);
      if (!data) return error(404, 'Transaction not found or already deleted');
      return { message: 'Transaction deleted' };
    },
    {
      params: t.Object({ id: t.String() }),
      detail: { tags: ['Transactions'], summary: 'Delete a transaction' },
    }
  );
