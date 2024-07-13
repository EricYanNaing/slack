create or replace 
function add_user_to_workplace(user_id text, workplace_id uuid) returns void as $$
BEGIN
  update workplaces set members = members || array[user_id]
  where id = workplace_id;
END;

$$ language plpgsql;
