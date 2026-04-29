import { parseSections } from "@/lib/parser";
import LoadingState from "./LoadingState";

export default function ResultPanel({
  loading,
  result
}) {
  const items = parseSections(result);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

      <h3 className="text-2xl font-semibold mb-8">
        Future Transmission
      </h3>

      {loading && <LoadingState />}

      {!loading && !result && (
        <div className="min-h-[500px] flex items-center justify-center text-slate-500 text-center">
          Fill the form and begin your session.
        </div>
      )}

      {!loading && result && (
        <div className="space-y-4">

          {items.map((item,index)=>(
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
            >
              <p className="text-blue-400 text-xs uppercase tracking-[4px] mb-3">
                {item.title}
              </p>

              <div className="text-slate-300 whitespace-pre-wrap leading-7 text-sm">
                {item.content}
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}