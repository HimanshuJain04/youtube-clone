import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return <>You are not logged in</>;
  }

  return;
  <>
    <div>Page</div>
  </>;
}
