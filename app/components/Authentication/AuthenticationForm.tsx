"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useW3sContext } from "../../providers/W3sProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { TextField } from "@/app/components/TextField";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Content } from "..";

const formSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password required"),
});

type FormInputs = yup.InferType<typeof formSchema>;

interface AuthenticationFormProps {
  /**
   * Is the form a sign in form
   */
  isSignIn?: boolean;
}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  isSignIn = true,
}) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const [isMasked, setIsMasked] = useState(true);
  const [formMessage, setFormMessage] = useState<string | undefined>(undefined);
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();
  const { client } = useW3sContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (redirect && client && session) {
      if (session.user.challengeId) {
        client.execute(session.user.challengeId, (error, result) => {
          if (error) {
            setFormMessage("An error occurred on PIN Setup. Please try again.");
          } else if (result) {
            // result will be undefined if popup is closed
            // only navigate to wallets if PIN setup complete
            router.push("/wallets");
          }
        });
      } else {
        router.push("/wallets");
      }
      setLoading(false);
    }
  }, [redirect, session, session?.user, client, router]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    if (!isSignIn) {
      const res = await signIn("SignUp", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        return setRedirect(true);
      } else if (res?.error) {
        setFormMessage(res.error);
      } else {
        setFormMessage("An error occurred on Sign Up. Please try again.");
      }
      setLoading(false);
    } else {
      const res = await signIn("SignIn", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        return setRedirect(true);
      } else {
        setFormMessage("Invalid Credentials.");
      }
      setLoading(false);
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
        <h1 className="text-2xl font-bold">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="opacity-90 mt-1">
          {isSignIn ? "Sign in to continue" : "Shop on PushCart"}
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            placeholder="Email address"
            type="email"
            error={!!formState.errors.email?.message}
            helperText={formState.errors.email?.message}
            {...register("email")}
          />
          
          <TextField
            placeholder="Password"
            type={isMasked ? "password" : "text"}
            error={!!formState.errors.password?.message}
            helperText={formState.errors.password?.message}
            endDecorator={
              <button 
                type="button"
                onClick={() => setIsMasked((f) => !f)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isMasked ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            }
            {...register("password")}
          />
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignIn ? "Sign In" : "Create Account"}
          </button>
          
          {formMessage && (
            <div className="text-red-500 text-center text-sm py-2">
              {formMessage}
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={isSignIn ? () => router.push("/signup") : () => router.push("/login")}
            className="ml-1 text-indigo-600 font-medium hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
