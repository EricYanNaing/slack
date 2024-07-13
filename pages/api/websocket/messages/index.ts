import { getUserDataPages } from "@/actions/get-user-data";
import supabaseServerClientPages from "@/lib/supabase/supabaseServerPages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler  (req:NextApiRequest,res:NextApiResponse)  {
    if(req.method !== 'POST'){
        return res.status(405).json({messge : 'Method not allowed.'})
    }

    try{

        const userData = await getUserDataPages(req,res)

        if(!userData){
            return res.status(401).json({messge : 'Unathorized.'})
        }

        const {channelId,workplaceId} = req.query;

        if (!channelId || !workplaceId) {
            return res.status(400).json({ message: 'Bad request' });
          }

        const {content,fileUrl} = req.body;

        if(!content && !fileUrl){
        return res.status(400).json({messge : 'Bad Request.'})
        }

        const supabase = supabaseServerClientPages(req,res);

        const { data : channelData } = await supabase.from('channels').select('*').eq('id',channelId).contains("members",[userData.id]);

        if(!channelData){
        return res.status(403).json({messge : 'Channel not found.'})
        }

        const {error : createMessageError, data } = await supabase.from('messages').insert({
            user_id : userData.id,
            workplace_id : workplaceId,
            channel_id : channelId,
            content,
            file_url : fileUrl,

        }).select('*,user: user_id(*)').single();

        if(createMessageError){
        return res.status(500).json({messge : 'Internal Server Error.'})
        }


        // insert message success.
        return res.status(201).json({message : 'Message created.',data});


    }catch(error){
        console.log("Message creation error.",error)
        return res.status(500).json({messge : 'Internal Server Error.'})

    }
}