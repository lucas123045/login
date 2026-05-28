// A decorative phone mockup inspired by Instagram's desktop login page
export default function PhoneMockup() {
  const screens = [
    { bg: "from-[#FFECD2] to-[#FCB69F]", emoji: "🏔️" },
    { bg: "from-[#A1C4FD] to-[#C2E9FB]", emoji: "🌊" },
    { bg: "from-[#D4FC79] to-[#96E6A1]", emoji: "🌿" },
  ];

  return (
    <div className="relative w-[280px] h-[580px] float-animation">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-white rounded-[44px] shadow-2xl border border-gray-200 overflow-hidden">
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-1">
          <span className="text-xs font-semibold text-gray-800">9:41</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="flex gap-1">
            <div className="w-4 h-3 border border-gray-800 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-800 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="px-4 py-2">
          {/* Logo */}
          <h1
            style={{ fontFamily: "'Grand Hotel', cursive" }}
            className="text-2xl text-center text-gray-900 mb-4"
          >
            InstaClone
          </h1>

          {/* Stories row */}
          <div className="flex gap-3 mb-4 overflow-hidden">
            {["👩‍💻", "🧑‍🎨", "👨‍🍳", "🧑‍🚀", "👩‍🎤"].map((emoji, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#F09433] via-[#DC2743] to-[#BC1888]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl">
                    {emoji}
                  </div>
                </div>
                <span className="text-[9px] text-gray-500">user_{i + 1}</span>
              </div>
            ))}
          </div>

          {/* Post cards */}
          {screens.map((s, i) => (
            <div key={i} className="mb-3">
              {/* Post header */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${s.bg} flex items-center justify-center text-sm`}
                >
                  {s.emoji}
                </div>
                <span className="text-[10px] font-semibold text-gray-800">
                  user_{i + 1}
                </span>
              </div>
              {/* Image */}
              <div
                className={`w-full h-36 rounded-sm bg-gradient-to-br ${s.bg} flex items-center justify-center text-5xl`}
              >
                {s.emoji}
              </div>
              {/* Actions */}
              <div className="flex gap-3 mt-2 px-0.5">
                <span className="text-lg">🤍</span>
                <span className="text-lg">💬</span>
                <span className="text-lg">↗️</span>
              </div>
              <p className="text-[10px] text-gray-600 mt-1 px-0.5">
                <span className="font-semibold">user_{i + 1}</span> Uma foto incrível do dia! 🌟
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
