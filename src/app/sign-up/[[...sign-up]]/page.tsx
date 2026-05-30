import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex max-w-lg justify-center px-4 py-12">
      <SignUp
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
