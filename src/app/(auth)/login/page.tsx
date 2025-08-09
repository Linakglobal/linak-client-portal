import ImmigrationLoginForm from "@/components/forms/immigration-login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md">
        <ImmigrationLoginForm />
      </div>
    </div>
  );
}