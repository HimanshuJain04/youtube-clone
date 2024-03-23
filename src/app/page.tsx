import { auth, currentUser } from "@clerk/nextjs";
import Home from "@/components/home/Home";
import Sidebar from "@/components/common/Sidebar";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();
  const showSideBar = true;

  if (!userId || !user) {
    return <>You are not logged in</>;
  }

  return (
    <>
      <div className="w-full flex flex-row justify-start items-start bg-black relative min-h-screen">
        <div
          className={
            `relative bg-black ` +
            (showSideBar
              ? "w-0 sm:w-[230px] block"
              : " w-[100px] md:block hidden")
          }
        >
          <Sidebar />
        </div>

        <div className="relative px-5  w-full">
          <Home />
        </div>
      </div>
    </>
  );
}
