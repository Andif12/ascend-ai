import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-8">
      <div className="flex items-center gap-3">

        <Image
          src="/logoo.png"
          alt="Ascend AI Logo"
          width={42}
          height={42}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            ASCEND AI
          </h1>

          <p className="text-xs text-slate-400">
            Future Intelligence
          </p>
        </div>

      </div>

      <div className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-400">
        Private • Personalized
      </div>
    </header>
  );
}