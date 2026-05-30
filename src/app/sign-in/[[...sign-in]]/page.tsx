import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="mx-auto flex max-w-lg justify-center px-4 py-12">
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-sm border border-ocean-100 rounded-2xl",
          },
        }}
      />
    </div>
  );
}
