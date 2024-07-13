create or replace 
function add_workplace_to_user(user_id uuid, new_workplace text) returns void as $$
BEGIN
  update users set workplaces = workplaces || array[new_workplace]
  where id = user_id;
END;

$$ language plpgsql;
