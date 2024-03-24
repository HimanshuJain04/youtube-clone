import { auth, currentUser } from "@clerk/nextjs";
import HomeCard from "@/components/cards/HomeCard";
import Sidebar from "@/components/common/Sidebar";

export default async function Home() {
  // const { userId }: { userId: string | null } = auth();
  // const user = await currentUser();

  // if (!userId || !user) {
  //   return <>You are not logged in</>;
  // }

  const list = [1, 1, 1, 1, 11, 1];

  return (
    <div className="w-full gap-5 flex relative min-h-screen bg-black">
      <div>
        <Sidebar />
      </div>

      <div className="w-full flex flex-wrap justify-start items-start gap-5">
        {list.map((item, index) => (
          <HomeCard key={index} />
        ))}
      </div>
    </div>
  );
}
