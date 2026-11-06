import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "The cinema · Sonora Community Café" };

export default function Page() {
  return <ComingSoon title="The cinema" />;
}
