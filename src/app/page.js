"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    situation: "",
    struggle: "",
    goal: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.situation.trim() ||
      !form.struggle.trim() ||
      !form.goal.trim()
    ) {
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setResult(data.result || "No response.");
    } catch {
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function renderOutput(text) {
    if (!text) return null;

    const sections = text.split(/\d\.\s+/).filter(Boolean);

    const titles = [
      "Future You Says",
      "What Happens If Nothing Changes",
      "Hidden Opportunity",
      "Next 7 Days Plan",
      "Success Trajectory"
    ];

    return sections.map((item, index) => (
      <div
        key={index}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-blue-300">
          {titles[index]}
        </p>

        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
          {item}
        </div>
      </div>
    ));
  }

  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white/[0.04]";

  return (
    <main className="min-h-screen bg-[#060816] text-white overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[380px] w-[380px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-120px] bottom-[-80px] h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* NAVBAR */}
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-4">
            <Image
              src="/logoo.png"
              alt="Ascend AI"
              width={44}
              height={44}
              className="rounded-xl"
            />

            <div>
              <h1 className="text-lg font-semibold tracking-wide">
                ASCEND AI
              </h1>

              <p className="text-xs text-slate-500">
                Future Intelligence
              </p>
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
            Private • Personalized
          </div>
        </header>

        {/* HERO */}
        <section className="grid items-center gap-14 py-12 lg:grid-cols-2 lg:py-20">
          {/* LEFT */}
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.32em] text-blue-300">
              Premium AI Experience
            </p>

            <h2 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Meet The{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Future You
              </span>
            </h2>

            <p className="mb-8 max-w-xl text-lg leading-8 text-slate-400">
              Talk with an AI version of your future successful self.
              Gain clarity, avoid regret, and unlock your next move.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("session")
                    ?.scrollIntoView({
                      behavior: "smooth"
                    })
                }
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold transition hover:opacity-90"
              >
                Start Session
              </button>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-slate-300">
                Fast Responses
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="flex justify-center">
            <div className="w-full max-w-[520px] rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Neural Signal
                </span>

                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
                  Live
                </span>
              </div>

              <div className="flex h-[260px] items-center justify-center">
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 shadow-[0_0_90px_rgba(59,130,246,0.18)]">
                  <div className="absolute h-64 w-64 rounded-full border border-blue-400/10" />
                  <div className="absolute h-80 w-80 rounded-full border border-violet-400/10 animate-spin duration-[18000ms]" />

                  <span className="text-7xl font-bold">A</span>
                </div>
              </div>

              <p className="text-center text-sm text-slate-400">
                Reading timelines and unseen patterns.
              </p>
            </div>
          </div>
        </section>

        {/* SESSION */}
        <section
          id="session"
          className="grid gap-8 pb-24 lg:grid-cols-[430px_1fr]"
        >
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h3 className="mb-2 text-2xl font-semibold">
              Your Current Reality
            </h3>

            <p className="mb-8 text-slate-400">
              Better input creates better futures.
            </p>

            <div className="space-y-4">
              <input
                className={inputStyle}
                placeholder="Name *"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

              <input
                className={inputStyle}
                placeholder="Age"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value
                  })
                }
              />

              <textarea
                rows="3"
                className={inputStyle}
                placeholder="Current Situation *"
                value={form.situation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    situation: e.target.value
                  })
                }
              />

              <textarea
                rows="3"
                className={inputStyle}
                placeholder="Biggest Struggle *"
                value={form.struggle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    struggle: e.target.value
                  })
                }
              />

              <textarea
                rows="3"
                className={inputStyle}
                placeholder="5-Year Goal *"
                value={form.goal}
                onChange={(e) =>
                  setForm({
                    ...form,
                    goal: e.target.value
                  })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold transition hover:opacity-90 disabled:opacity-60"
              >
                {loading
                  ? "Connecting..."
                  : "Talk To Future Me"}
              </button>
            </div>
          </form>

          {/* RESULT */}
          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-blue-300">
                  Future Transmission
                </p>

                <h3 className="text-2xl font-semibold">
                  Incoming Message
                </h3>
              </div>

              {result && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(result)
                  }
                  className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-400"
                >
                  Copy
                </button>
              )}
            </div>

            {loading && (
              <div className="space-y-4 pt-12 text-slate-400">
                <div className="h-3 w-full rounded-full bg-white/5">
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                </div>

                <p>Connecting to your future self...</p>
                <p>Reading hidden patterns...</p>
                <p>Generating next moves...</p>
              </div>
            )}

            {!loading && !result && (
              <div className="flex min-h-[520px] items-center justify-center text-center text-slate-500">
                Fill the form and begin your session.
              </div>
            )}

            {!loading && result && (
              <div className="space-y-4">
                {renderOutput(result)}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}