import type { Metadata } from "next";

// sign-up 是 client component 不能 export metadata，用此 layout 统一设置
export const metadata: Metadata = {
  title: "Sign Up - Get 5 Free Credits | SeedPix",
  description:
    "Create a free SeedPix account and get 5 free credits to start editing photos with AI. No credit card needed.",
  robots: { index: false, follow: false },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
