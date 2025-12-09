'use client';

import { Suspense, lazy, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Loader from "../Spinner";

const RegisterForm = lazy(() => import("./CustomerSignupForm"));

function Delayed({ children, delay = 4000 }: { children: React.ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <>{children}</> : <Loader />;
}

export default function RegisterWrapper(props: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="relative text-center">
          <p onClick={props.handleClose} className="absolute right-10 text-x text-chart-2 font-bold cursor-pointer">X</p>
          <CardTitle className="text-2xl font-bold text-chart-2 ">Create an Account</CardTitle>
          <CardDescription>Sign up to get started. It only takes a minute!</CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Loader />}>
            <Delayed delay={1000}>
              <RegisterForm {...props} />
            </Delayed>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
