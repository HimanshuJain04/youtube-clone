import HomeCard from "@/components/cards/HomeCard";
import Sidebar from "@/components/common/Sidebar";

export default function Home() {
  const list = [1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1];

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
