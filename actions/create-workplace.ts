'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { updateUserWorkPlace } from "./update-user-workplace";
import { addMemberToWorkplace } from "./add-member-to-workplace";

export const createWorkPlace = async ({imageUrl,name,slug, inviteCode} : {imageUrl? : string; name : string; slug : string; inviteCode : string}) => {
    const supabase = await supabaseServerClient();
    const userData = await getUserData();
  
    if (!userData) {
      return { error: 'No user data' };
    }
  
    const { error, data: workplaceRecord } = await supabase
      .from('workplaces')
      .insert({
        image_url: imageUrl,
        name,
        super_admin: userData.id,
        slug,
        invite_code : inviteCode,
      })
      .select('*');
  
    if (error) {
      return { error };
    }
  
    const [updateWorkplaceData, updateWorkplaceError] = await updateUserWorkPlace(
      userData.id,
      workplaceRecord[0].id
    );

    // Add member to workpalce
    const [addMemberToWorkplaceData,addMemberToWorkplaceError] = await addMemberToWorkplace(userData.id, workplaceRecord[0].id)

    if(addMemberToWorkplaceError){
        return {error : addMemberToWorkplaceError}
    }
}