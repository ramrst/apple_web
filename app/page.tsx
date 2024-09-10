import Image from "next/image";
import Nav_bar from "./components/Nav_bar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Features from "./components/Features";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Nav_bar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
    </main>
  );
}
