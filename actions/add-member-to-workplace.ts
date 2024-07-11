import { supabaseServerClient } from "@/lib/supabase/supabaseServer"

export const addMemberToWorkplace = async (userId : string, workplaceId : number) => {
    const supabase = await supabaseServerClient()

    //update the workplace members

    const { data: addMemberToWorkplaceData, error: addMemberToWorkplaceError } =
    await supabase.rpc('add_user_to_workplace', {
      user_id: userId,
      workplace_id: workplaceId,
    });

  return [addMemberToWorkplaceData, addMemberToWorkplaceError];
}