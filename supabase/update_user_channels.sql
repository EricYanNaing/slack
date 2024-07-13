create or replace 
function update_user_channels (user_id uuid, channel_id text) returns void as $$
BEGIN
  update users set channels = channels || array[channel_id]
  where id = user_id;
END;

$$ language plpgsql;
