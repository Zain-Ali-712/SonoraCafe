import { Loader } from "@/components/home/Loader";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { ThirdSpace } from "@/components/home/ThirdSpace";
import { TheWall } from "@/components/home/TheWall";
import { Menu } from "@/components/home/Menu";
import { AfterDark } from "@/components/home/AfterDark";
import { Happenings } from "@/components/home/Happenings";
import { DealTicket } from "@/components/home/DealTicket";
import { LifeReel } from "@/components/home/LifeReel";
import { Voices } from "@/components/home/Voices";
import { Visit } from "@/components/home/Visit";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Loader />
        <Hero />
        <Ticker />
        <ThirdSpace />
        <TheWall />
        <Menu />
        <AfterDark>
          <Happenings />
          <DealTicket />
          <LifeReel />
          <Voices />
        </AfterDark>
        <Visit />
      </main>
      <Footer />
    </>
  );
}
