export default function LoadingState() {
  return (
    <div className="space-y-4 pt-10 text-slate-400">
      <div className="h-3 w-full rounded-full bg-slate-800">
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
      </div>

      <p>Connecting to your future self...</p>
      <p>Reading hidden patterns...</p>
      <p>Generating next moves...</p>
    </div>
  );
}