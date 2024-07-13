'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { getUserData } from "./get-user-data";

export const createChannel = async ({name,workplaceId,userId} : {workplaceId : string; name: string,userId : string}) => {
    const supabase = await supabaseServerClient()
    const userData = await getUserData()

    if(!userData){
        return {error : 'No User Data.'}
    }
    const {error,data : channelRecord} = await supabase.from('channels').insert({
        name,workplace_id : workplaceId,user_id : userId
    }).select('*')

    if(error){
        return {error : "insert Error"}
    }

    // update channel members array
    const [,updateChannelMemberError] = await updateChannelMembers(userId ,channelRecord[0].id);

    if(updateChannelMemberError){
        return {error : 'Update channel member error.'}
    }

    // Add Channel to user's channel array
    const [, addChannelToUserError] = await addChannelToUser(userData.id, channelRecord[0].id)

    if(addChannelToUserError){
        return {error : 'Update channel to user error.'}
    }

    const [,addWorkPlaceChannelError] = await updateWorkPlaceChannel(channelRecord[0].id,workplaceId)

    if(addWorkPlaceChannelError){
        return {error : 'Update channel to work places error.'}
    }
}

export const addChannelToUser= async (userId : string,channelId : string) => {
    const supabase = await supabaseServerClient()

    const {data : addChannelData, error : addChannelError } = await supabase.rpc('update_user_channels',{user_id : userId,channel_id : channelId })

    return [addChannelData,addChannelError]
}

export const updateChannelMembers = async ( userId : string, channelId :  string) => {
    const supabase = await supabaseServerClient()

    const {data : updateChannelData, error : updateChannelError } = await supabase.rpc('update_channels_members',{new_member : userId,channel_id : channelId })

    return [updateChannelData,updateChannelError]
}

export const updateWorkPlaceChannel = async (  channelId :  string ,workPlaceId : string) => {
    const supabase = await supabaseServerClient()

    const {data : updateWorkplaceData, error : updateWorkplaceError } = await supabase.rpc('add_channels_to_workplace',{ channel_id : channelId, workplace_id : workPlaceId })

    return [updateWorkplaceData,updateWorkplaceError]
}

export const updateChannelRegulators = async (
    userId: string,
    channelId: string
  ) => {
    const supabase = await supabaseServerClient();
  
    const { data: updateChannelData, error: updateChannelError } =
      await supabase.rpc('update_channel_regulators', {
        new_regulator: userId,
        channel_id: channelId,
      });
  
    return [updateChannelData, updateChannelError];
  };