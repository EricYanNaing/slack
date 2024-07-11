'use server'

import { supabaseServerClient } from "@/lib/supabase/supabaseServer"

export const getUserWorkPlaceData = async (workplaceIds : Array<string>) => {
    const supabase = await supabaseServerClient()

    const {data,error} = await supabase.from('workplaces').select('*').in('id',workplaceIds);

    return [data,error];
}

export const getCurrentWorkPlaceData = async (workPlaceId : string) => {
    const supabase = await supabaseServerClient();

    const {data,error} = await supabase.from('workplaces').select('*').eq('id',workPlaceId).single();

    return [data,error]
}