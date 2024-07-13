create or replace 
function update_channels_members (new_member text, channel_id uuid) returns void as $$
BEGIN
  update channels set members = members || array[new_member]
  where id = channel_id;
END;

$$ language plpgsql;
