export default function FormPanel({
  form,
  setForm,
  loading,
  handleSubmit
}) {
  const input =
    "w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
    >
      <h3 className="text-2xl font-semibold mb-2">
        Your Current Reality
      </h3>

      <p className="text-slate-400 mb-8">
        Better input creates better futures.
      </p>

      <div className="space-y-4">

        <input
          className={input}
          placeholder="Name"
          value={form.name}
          onChange={(e)=>
            setForm({...form,name:e.target.value})
          }
        />

        <input
          className={input}
          placeholder="Age"
          value={form.age}
          onChange={(e)=>
            setForm({...form,age:e.target.value})
          }
        />

        <textarea
          rows="3"
          className={input}
          placeholder="Current Situation"
          value={form.situation}
          onChange={(e)=>
            setForm({...form,situation:e.target.value})
          }
        />

        <textarea
          rows="3"
          className={input}
          placeholder="Biggest Struggle"
          value={form.struggle}
          onChange={(e)=>
            setForm({...form,struggle:e.target.value})
          }
        />

        <textarea
          rows="3"
          className={input}
          placeholder="5-Year Goal"
          value={form.goal}
          onChange={(e)=>
            setForm({...form,goal:e.target.value})
          }
        />

        <button
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 font-semibold"
        >
          {loading ? "Connecting..." : "Talk To Future Me"}
        </button>

      </div>
    </form>
  );
}