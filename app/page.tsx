import type { Metadata } from "next";
import { Homepage } from "@/components/home/homepage";

export const metadata: Metadata = {
  title: "Bagas Al Haekal Nasution | Product Designer",
};

export default function Home() {
  return <Homepage />;
}
