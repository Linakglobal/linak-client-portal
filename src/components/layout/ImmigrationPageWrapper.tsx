import MainNavigation from "@/components/layout/MainNavigation";

interface ImmigrationPageWrapperProps {
  children: React.ReactNode;
}

export default function ImmigrationPageWrapper({ children }: ImmigrationPageWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <MainNavigation />
      <main>{children}</main>
    </div>
  );
}