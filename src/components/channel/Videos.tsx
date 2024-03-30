import { fetchUserVideos } from "@/actions/video";

const Videos = async ({ userId }: any) => {
  const allVideos = await fetchUserVideos(userId);
  return <div>{}</div>;
};

export default Videos;
