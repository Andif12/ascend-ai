"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    situation: "",
    struggle: "",
    goal: "",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data.result || "No response.");
    } catch {
      setResult(
        "The link to your future self has been severed. Please try again. / Garis waktu sementara tidak dapat dihubungi. Coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  function renderOutput(text) {
    if (!text) return null;

    // Memisahkan teks berdasarkan format nomor (1. , 2. , dst)
    const sections = text.split(/\d\.\s+/).filter(Boolean);

    return sections.map((item, index) => {
      // Memisahkan baris pertama (sebagai judul) dan sisanya (sebagai konten)
      const lines = item.trim().split("\n");

      // Mengambil judul dan membersihkan simbol bintang/kurung jika AI menambahkannya
      const title = lines[0].replace(/[*\[\]]/g, "").trim();

      // Menggabungkan sisa teks sebagai konten
      const content = lines.slice(1).join("\n").trim();

      return (
        <div
          key={index}
          className="mb-6 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl transition-all hover:bg-white/[0.04] group"
        >
          <div className="absolute top-0 left-0 w-1 h-full transition-opacity bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-40 group-hover:opacity-100"></div>

          <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            {title || `Module ${index + 1}`}
          </h4>
          <div className="text-sm italic font-light leading-relaxed whitespace-pre-wrap text-slate-300">
            "{content || item.trim()}"
          </div>
        </div>
      );
    });
  }

  // Desain input diperjelas: border lebih tegas, background lebih pekat
  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-[#0a0a0e] px-5 py-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all hover:border-slate-500 focus:border-indigo-500/50 focus:bg-[#111118] focus:ring-1 focus:ring-indigo-500/30 shadow-inner";

  return (
    <main className="min-h-screen bg-[#030303] text-slate-200 font-sans relative overflow-x-hidden">
      {/* MINIMALIST MODERN BLUR BACKGROUND */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Glow warna super lembut dan besar agar tidak mendistraksi UI */}
        <div className="absolute top-[-20%] left-[-10%] h-[80vh] w-[80vw] rounded-full bg-indigo-600/15 blur-[160px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] h-[80vh] w-[80vw] rounded-full bg-violet-600/15 blur-[160px]"></div>
      </div>

      <div className="relative z-10 px-8 py-16 mx-auto max-w-7xl lg:py-24">
        {/* HEADER SECTION - Aligned Left for a Professional Technical Look */}
        <header className="flex flex-col items-start pb-12 mb-20 border-b border-white/5">
          <div className="flex items-center gap-5 mb-8">
            <Image
              src="/logoo.png"
              alt="Ascend AI Logo"
              width={56}
              height={56}
              className="rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.2)] border border-white/10"
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-[0.4em] text-indigo-400 uppercase">
                Neural Link Established
              </span>
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                ASCEND <span className="text-indigo-500">AI</span>
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-400">
            Synchronize your current reality with your peak potential. Receive
            direct strategic transmissions from your successful self, 10 years
            in the future.
          </p>
        </header>

        {/* WORKSPACE LAYOUT */}
        <div className="grid items-start gap-16 lg:grid-cols-12">
          {/* LEFT PANEL: DATA INPUT */}
          <div className="lg:col-span-5">
            {/* Form dibungkus dalam card semi-transparan agar sangat kentara */}
            <div className="sticky space-y-8 top-12 p-8 border border-white/5 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
              <div>
                <h2 className="text-xl font-medium tracking-tight text-white">
                  Input Parameters
                </h2>
                <p className="mt-2 font-mono text-xs tracking-widest uppercase text-slate-500">
                  Core Data Entry / Node_01
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.2em] ml-1 font-medium">
                      Identity
                    </label>
                    <input
                      required
                      className={inputClass}
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.2em] ml-1 font-medium">
                      Biological Age
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Years"
                      type="number"
                      value={form.age}
                      onChange={(e) =>
                        setForm({ ...form, age: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-[0.2em] ml-1 font-medium">
                    Current Reality
                  </label>
                  <textarea
                    required
                    rows="3"
                    className={inputClass}
                    placeholder="Describe your current professional and personal status..."
                    value={form.situation}
                    onChange={(e) =>
                      setForm({ ...form, situation: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-[0.2em] ml-1 font-medium">
                    Primary Friction
                  </label>
                  <textarea
                    required
                    rows="3"
                    className={inputClass}
                    placeholder="What is your biggest struggle right now?"
                    value={form.struggle}
                    onChange={(e) =>
                      setForm({ ...form, struggle: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-[0.2em] ml-1 font-medium">
                    5-Year Objective
                  </label>
                  <textarea
                    required
                    rows="3"
                    className={inputClass}
                    placeholder="Where must you be in 1,825 days?"
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-indigo-600 px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-40 shadow-[0_10px_30px_rgba(99,102,241,0.2)]"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative w-8 h-full bg-white/20"></div>
                  </div>
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/20 border-t-white"></span>
                      Initiating Connection...
                    </>
                  ) : (
                    "Sync With Future Self"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT PANEL: TRANSMISSION OUTPUT */}
          <div className="lg:col-span-7">
            <div className="min-h-[650px] rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-10 lg:p-14 relative shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]">
              {/* Corner Accents for a Futuristic UI Feel */}
              <div className="absolute w-6 h-6 border-t-2 border-l-2 rounded-tl-lg top-8 left-8 border-indigo-500/30"></div>
              <div className="absolute w-6 h-6 border-b-2 border-r-2 rounded-br-lg bottom-8 right-8 border-indigo-500/30"></div>

              {loading ? (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="relative mb-10">
                    <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full animate-ping bg-indigo-500/20"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-light tracking-widest text-white">
                    ANALYZING TIMELINES
                  </h3>
                  <div className="mt-4 font-mono text-[10px] text-slate-500 space-y-2 uppercase tracking-widest">
                    <p className="animate-pulse">
                      Retrieving potential vectors...
                    </p>
                  </div>
                </div>
              ) : result ? (
                <div className="duration-1000 animate-in fade-in">
                  <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/5">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        Transmission Received
                      </h2>
                      <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-[0.3em]">
                        Source: Future_V.01 // Year_2036
                      </p>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      Copy Log
                    </button>
                  </div>
                  <div className="space-y-4">{renderOutput(result)}</div>
                </div>
              ) : (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="mb-8 opacity-20">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-slate-600 uppercase tracking-[0.4em]">
                    System Idle. Awaiting Parameters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
