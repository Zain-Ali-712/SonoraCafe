import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "The Wall · Sonora Community Café" };

export default function Page() {
  return <ComingSoon title="The Wall" />;
}
