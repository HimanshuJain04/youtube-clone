import { auth, currentUser } from "@clerk/nextjs";
import HomeCard from "@/components/cards/HomeCard";
import Sidebar from "@/components/common/Sidebar";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return <>You are not logged in</>;
  }

  const list = [1, 1, 1, 1, 11, 1];

  console.log("User: ", user);

  return (
    <div className="w-full relative min-h-screen bg-black">
      <div className="w-full flex flex-wrap justify-between gap-5">
        {list.map((item, index) => (
          <HomeCard key={index} />
        ))}
      </div>
    </div>
  );
}

{
  /* <div className="w-full flex flex-row justify-start items-start bg-black relative min-h-screen">
<div
  className={
    `relative bg-black ` +
    (true ? "w-0 sm:w-[230px] block" : " w-[100px] md:block hidden")
  }
>
  <Sidebar />
</div>

<div className="relative px-5  w-full">
  <Home />
</div>
</div> */
}
