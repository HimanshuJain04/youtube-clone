import HomeCard from "@/components/cards/HomeCard";
function Home() {
    const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    return (
        <div className='flex justify-center  w-full items-start flex-wrap gap-y-8 gap-x-2 pt-5 pb-20'>

            {
                list.map((item, index) => (
                    <HomeCard key={index} />
                ))
            }


        </div>
    )
}

export default Home