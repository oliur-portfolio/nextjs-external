import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  callbackUrl?: string | null;
}

const GoogleSignInButton = ({ callbackUrl }: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: callbackUrl ?? "/dashboard",
    });
  };

  return (
    <Button type="button" variant="outline" onClick={handleGoogleSignIn}>
      <FcGoogle className="h-5 w-5" />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
