import { supabaseServerClient } from "@/lib/supabase/supabaseServer";
import { User } from "@/types/app";

export const getUserData = async (): Promise<User | null> => {
    const supabase = await supabaseServerClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();

    if(!user){
        console.log("NOT User",user);
        return null
    }

    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id);

    if(error){
        console.log("ERROR",error)
        return null
    }

    return data ? data[0] : null
}