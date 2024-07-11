'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer"

export const updateUserWorkPlace = async (userId:string, workplaceId : string) => {
    const supabase = await supabaseServerClient()

    // Update the user record
    const {data : updateWorkplaceData, error : updateWorkplaceError} = await supabase.rpc('add_workplace_to_user',
        {user_id : userId, 
            new_workplace : workplaceId});

    return [updateWorkplaceData,updateWorkplaceError]
}