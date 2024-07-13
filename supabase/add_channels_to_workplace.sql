create or replace 
function add_channels_to_workplace(channel_id text, workplace_id uuid) returns void as $$
BEGIN
  update workplaces set channels = channels || array[channel_id]
  where id = workplace_id;
END;

$$ language plpgsql;
