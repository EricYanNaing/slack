import { getUserData } from "@/actions/get-user-data";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }

  const userWorkPlaceId = userData.workplaces?.[0];

  if (!userWorkPlaceId) {
    return redirect("/create-workplace");
  }

  if (userWorkPlaceId) {
    return redirect(`/workplace/${userWorkPlaceId}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Login</Button>
    </main>
  );
}
