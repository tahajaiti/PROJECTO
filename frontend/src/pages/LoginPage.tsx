import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/useAuth";


const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, error, isPending } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    await mutateAsync(data);
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm text-white border border-blue-500/30">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Sign in to your account</h2>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-center text-sm">
          {error.message || "Login failed, try again later."}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1.5">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-500 cursor-pointer transition-all shadow-lg shadow-blue-600/20
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;