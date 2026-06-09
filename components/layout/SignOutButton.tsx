"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
    setLoading(false);
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
