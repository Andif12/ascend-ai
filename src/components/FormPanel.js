export default function FormPanel({ form, setForm, loading, handleSubmit }) {
  // Styling modular untuk input agar rapi
  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-400 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl h-fit"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Your Current Reality
        </h3>
        <p className="text-sm text-slate-400">
          Better input creates better futures.
        </p>
      </div>

      <div className="space-y-5">
        <input
          required
          className={inputStyle}
          placeholder="Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className={inputStyle}
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <textarea
          required
          rows="3"
          className={inputStyle}
          placeholder="Current Situation *"
          value={form.situation}
          onChange={(e) => setForm({ ...form, situation: e.target.value })}
        />

        <textarea
          required
          rows="3"
          className={inputStyle}
          placeholder="Biggest Struggle *"
          value={form.struggle}
          onChange={(e) => setForm({ ...form, struggle: e.target.value })}
        />

        <textarea
          required
          rows="3"
          className={inputStyle}
          placeholder="5-Year Goal *"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            "Talk To Future Me"
          )}
        </button>
      </div>
    </form>
  );
}
