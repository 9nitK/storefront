import CheckoutPageClient from "@/views/checkout/CheckoutPageClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect(`/login?next=/checkout`);
  }

  return <CheckoutPageClient />;
}
