'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer"
import { getUserData } from "./get-user-data";
import { addMemberToWorkplace } from "./add-member-to-workplace";
import { updateUserWorkPlace } from "./update-user-workplace";

export const getUserWorkPlaceData = async (workplaceIds : Array<string>) => {
    const supabase = await supabaseServerClient()

    const {data,error} = await supabase.from('workplaces').select('*').in('id',workplaceIds);

    return [data,error];
}

export const getCurrentWorkPlaceData = async (workPlaceId : string) => {
    const supabase = await supabaseServerClient();

    const {data,error} = await supabase.from('workplaces').select('*, channels (*)').eq('id',workPlaceId).single();

    const {members} = data;

    const memberDetails = await Promise.all(
        members.map(async (memberId: string) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', memberId)
            .single();
    
          if (userError) {
            console.log(
              `Error fetching user data for member ${memberId}`,
              userError
            );
            return null;
          }
    
          return userData;
        })
      );
    
      data.members = memberDetails.filter(member => member !== null);
    
      return [data, error];
}

export const workspaceInvite = async (inviteCode: string) => {
    const supabase = await supabaseServerClient();
    const userData = await getUserData();
  
    const { data, error } = await supabase
      .from('workplaces')
      .select('*')
      .eq('invite_code', inviteCode)
      .single();
  
    if (error) {
      console.log('Error fetching workspace invite', error);
      return;
    }
  
    const isUserMember = data?.members?.includes(userData?.id);
  
    if (isUserMember) {
      console.log('User is already a member of this workspace');
      return;
    }
  
    if (data?.super_admin === userData?.id) {
      console.log('User is the super admin of this workspace');
      return;
    }
  
    await addMemberToWorkplace(userData?.id!, data?.id);
  
    await updateUserWorkPlace(userData?.id!, data?.id);
  };