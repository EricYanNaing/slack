import { workspaceInvite } from '@/actions/workplaces';
import { supabaseServerClient } from '@/lib/supabase/supabaseServer';
import { redirect } from 'next/navigation';

const InvitePage = async ({
  params: { invite: inviteCode },
}: {
  params: { invite: string };
}) => {
  await workspaceInvite(inviteCode);

  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from('workplaces')
    .select('*')
    .eq('invite_code', inviteCode)
    .single();

  if (data) {
    redirect(`/workplace/${data.id}`);
  } else {
    redirect('/create-workplace');
  }
};

export default InvitePage;