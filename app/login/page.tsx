"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginWithEmail } from "./login";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const { toast } = useToast();

  const _loginWithEmail = async (formData: FormData) => {
    const email: string = formData.get("email")?.toString()!;
    const password: string = formData.get("password")?.toString()!;
    if (await loginWithEmail(email, password)) {
      toast({
        variant: "destructive",
        title: "Invalid login credentials!",
        description: "Please check your email and password.",
      });
    }
  };

  return (
    <main className="flex h-full items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="flex justify-center">
            Welcome to Event Run!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
          <Separator />
          <form action={_loginWithEmail} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Separator />
          <div className="flex space-x-4">
            <Link href="/register" className="w-full">
              <Button variant="outline" className="w-full">
                Create account
              </Button>
            </Link>
            <Link href="/forget-password" className="w-full">
              <Button variant="outline" className="w-full">
                Forget password
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
