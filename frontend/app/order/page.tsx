import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Order online · Sonora Community Café" };

export default function Page() {
  return <ComingSoon title="Order online" />;
}
