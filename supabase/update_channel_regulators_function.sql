create or replace 
function update_channel_regulators (new_regulator text, channel_id uuid) returns void as $$
BEGIN
  update channels set regulators = regulators || array[new_regulator]
  where id = channel_id;
END;

$$ language plpgsql;
