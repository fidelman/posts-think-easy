export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container mx-auto py-5">{children}</main>
    </>
  );
}
