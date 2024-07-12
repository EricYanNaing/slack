'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer"
import { Channel } from "@/types/app"

export const getUserWorkplaceChannel = async (workPlaceId : string, userId : string) => {
    const supabase = await supabaseServerClient()

    const {data : workPlaceData, error : workPlaceError} = await supabase.from('workplaces').select('channels').eq('id',workPlaceId).single()

    if(workPlaceError){
        console.error(workPlaceError)
        return []
    }

    const channelIds = workPlaceData.channels;

    if(!channelIds || channelIds.length === 0){
        console.error("No Channel Found")

        return []
    }

    const {data : channelData, error : channelError} = await supabase.from('channels').select('*').in('id',channelIds);

    if(channelError){
        console.log(channelError)
        return []
    }

    const userWorkPlaceChannels = channelData.filter(
        channel => channel.members.includes(userId)
    )

    return userWorkPlaceChannels as Channel[];

}