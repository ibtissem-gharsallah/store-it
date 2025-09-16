"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
const OTPModal = ({
  accountID,
  email,
}: {
  accountID: string;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //call API to Verify OTP
      const sessionId = await verifySecret({ accountID, password });
      if (sessionId) router.push("/");
    } catch (e) {
      console.error("Failed To Verify OTP", e);
    }
    setIsLoading(false);
  };
  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="shad-alert-dialog">
        <DialogHeader className="relative flex justify-center">
          <DialogTitle className="h2 text-center">Enter Your OTP</DialogTitle>
          <DialogDescription className="subtitle-2 text-center text-light-100">
            we've sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>
        <DialogFooter className="items-center">
          <div className="flex w-full flex-col gap-4">
            <Button
              onClick={handleSubmit}
              disabled={password.length !== 6 || isLoading}
              className="shad-submit-btn h-12"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  height={24}
                  width={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>
            <div className="subtitle-2 mt-2 text-light-100 text-center ">
              Didn't get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand "
                onClick={handleResendOTP}
              >
                Click to Resend
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default OTPModal;
