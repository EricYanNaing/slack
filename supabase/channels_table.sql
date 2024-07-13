create table
  channels (
    id uuid primary key default gen_random_uuid () not null,
    name text not null,
    workplace_id uuid references public.workplaces (id) not null,
    user_id uuid references public.users (id) not null,
    members text[],
    regulator text[]
  );

alter table channels enable row level security;

create policy "Can view own user data." on channels for
select
  using (auth.uid () = user_id);

  create policy "Can update own user data." on channels for
update
  using (auth.uid () = user_id);

  create policy "Can insert own user data." on channels for
insert 
with check
   (auth.uid () = user_id);
