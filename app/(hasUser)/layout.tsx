import AppBar from "./appBar";

export default function AppBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}
