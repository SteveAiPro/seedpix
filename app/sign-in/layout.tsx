import type { Metadata } from "next";

// sign-in 是 client component 不能 export metadata，用此 layout 统一设置
export const metadata: Metadata = {
  title: "Sign In | SeedPix",
  robots: { index: false, follow: false },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
