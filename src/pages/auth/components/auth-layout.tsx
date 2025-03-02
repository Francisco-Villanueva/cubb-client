export function AuthLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center justify-center bg-amber-50">
        {"children"}
      </div>
    </div>
  );
}
