import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";

interface ClientPortalLayoutProps {
  children: React.ReactNode;
}

export default function ClientPortalLayout({ children }: ClientPortalLayoutProps) {
  return <ImmigrationPageWrapper>{children}</ImmigrationPageWrapper>;
}