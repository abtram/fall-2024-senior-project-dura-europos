import LandingView from "@/components/templates/LandingView";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat bg-fixed">
      <LandingView />
    </main>
  );
}
