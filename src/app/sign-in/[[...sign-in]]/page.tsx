import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="min-h-screen bg-black w-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
