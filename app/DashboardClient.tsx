"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  LogOut,
  Compass,
  MessageCircle,
} from "lucide-react";
import { createClientInstance } from "@/lib/supabase";
import { Profile } from "@/types";

interface DashboardClientProps {
  profile: Profile | null;
  userEmail: string;
}

const MOCK_POSTS = [
  { id: 1, user: "maria_foto", emoji: "🌸", likes: 1204, caption: "Primavera chegando! 🌸✨", bg: "from-pink-100 to-rose-200" },
  { id: 2, user: "joao.viagens", emoji: "🏖️", likes: 876, caption: "Férias merecidas 🌊", bg: "from-sky-100 to-blue-200" },
  { id: 3, user: "chef_lucas", emoji: "🍝", likes: 2341, caption: "Almoço de domingo perfeito!", bg: "from-orange-100 to-amber-200" },
  { id: 4, user: "ana_arte", emoji: "🎨", likes: 543, caption: "Nova obra finalizada 🎨❤️", bg: "from-purple-100 to-violet-200" },
];

const MOCK_STORIES = [
  { user: "Seu story", emoji: "➕", isUser: true },
  { user: "maria_foto", emoji: "🌸", active: true },
  { user: "joao.viagens", emoji: "✈️", active: true },
  { user: "chef_lucas", emoji: "👨‍🍳", active: true },
  { user: "ana_arte", emoji: "🎨", active: false },
  { user: "pedro_dev", emoji: "💻", active: true },
];

export default function DashboardClient({ profile, userEmail }: DashboardClientProps) {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [loggingOut, setLoggingOut] = useState(false);

  const displayName = profile?.nome || userEmail.split("@")[0];
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClientInstance();
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  };

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#DBDBDB]">
        <div className="max-w-[975px] mx-auto px-4 h-[54px] flex items-center justify-between">
          <h1 style={{ fontFamily: "'Grand Hotel', cursive" }} className="text-2xl text-[#262626]">
            Instagram
          </h1>

          {/* Search (desktop) */}
          <div className="hidden md:flex">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
              <input
                type="text"
                placeholder="Pesquisar"
                className="bg-[#EFEFEF] rounded-lg pl-9 pr-4 py-1.5 text-sm w-[268px] outline-none text-[#262626] placeholder:text-[#8E8E8E]"
              />
            </div>
          </div>

          {/* Nav icons */}
          <div className="flex items-center gap-4">
            <button className="text-[#262626] hover:text-[#8E8E8E] transition-colors hidden md:block">
              <Home size={22} />
            </button>
            <button className="text-[#262626] hover:text-[#8E8E8E] transition-colors hidden md:block">
              <MessageCircle size={22} />
            </button>
            <button className="text-[#262626] hover:text-[#8E8E8E] transition-colors hidden md:block">
              <PlusSquare size={22} />
            </button>
            <button className="text-[#262626] hover:text-[#8E8E8E] transition-colors hidden md:block">
              <Compass size={22} />
            </button>
            <button className="text-[#262626] hover:text-[#8E8E8E] transition-colors hidden md:block">
              <Heart size={22} />
            </button>

            {/* Avatar dropdown */}
            <div className="relative group">
              <button className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F09433] via-[#DC2743] to-[#BC1888] flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                {initials}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#DBDBDB] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                <div className="px-4 py-3 border-b border-[#DBDBDB]">
                  <p className="text-sm font-semibold text-[#262626]">{displayName}</p>
                  <p className="text-xs text-[#8E8E8E] truncate">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#ED4956] hover:bg-[#FAFAFA] transition-colors rounded-b-lg"
                >
                  <LogOut size={14} />
                  {loggingOut ? "Saindo…" : "Sair"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-[54px] max-w-[975px] mx-auto px-4 py-8 flex gap-8">
        {/* Feed */}
        <div className="flex-1 max-w-[614px] mx-auto lg:mx-0">
          {/* Stories */}
          <div className="bg-white border border-[#DBDBDB] rounded-sm p-4 mb-6">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {MOCK_STORIES.map((story, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
                  <div className={`
                    p-[2px] rounded-full
                    ${story.isUser
                      ? "bg-[#DBDBDB]"
                      : story.active
                      ? "bg-gradient-to-tr from-[#F09433] via-[#DC2743] to-[#BC1888]"
                      : "bg-[#DBDBDB]"
                    }
                  `}>
                    <div className="w-14 h-14 rounded-full bg-white p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center text-2xl">
                        {story.emoji}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#262626] truncate max-w-[56px] text-center">
                    {story.isUser ? "Seu story" : story.user.split("_")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {MOCK_POSTS.map((post) => {
            const isLiked = likedPosts.has(post.id);
            return (
              <div key={post.id} className="bg-white border border-[#DBDBDB] rounded-sm mb-6">
                {/* Post header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#F09433] via-[#DC2743] to-[#BC1888]">
                    <div className="w-8 h-8 rounded-full bg-white p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#EFEFEF] flex items-center justify-center text-base">
                        {post.emoji}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#262626]">{post.user}</span>
                  <span className="ml-auto text-lg cursor-pointer">•••</span>
                </div>

                {/* Post image */}
                <div className={`w-full aspect-square bg-gradient-to-br ${post.bg} flex items-center justify-center text-8xl`}>
                  {post.emoji}
                </div>

                {/* Actions */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-4 mb-2">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="transition-transform active:scale-90"
                    >
                      <Heart
                        size={24}
                        className={`transition-colors ${isLiked ? "fill-[#ED4956] text-[#ED4956]" : "text-[#262626]"}`}
                      />
                    </button>
                    <button><MessageCircle size={24} className="text-[#262626]" /></button>
                    <button>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#262626]">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                    <button className="ml-auto">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#262626]">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-[#262626]">
                    {(post.likes + (isLiked ? 1 : 0)).toLocaleString("pt-BR")} curtidas
                  </p>
                  <p className="text-sm text-[#262626] mt-1">
                    <span className="font-semibold">{post.user}</span>{" "}
                    {post.caption}
                  </p>
                  <p className="text-xs text-[#8E8E8E] mt-1 uppercase tracking-wide">há 2 horas</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right sidebar (desktop) */}
        <aside className="hidden lg:block w-[319px] shrink-0">
          <div className="sticky top-[80px]">
            {/* User info */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F09433] via-[#DC2743] to-[#BC1888] flex items-center justify-center text-white text-sm font-bold">
                {initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#262626]">{displayName}</p>
                <p className="text-sm text-[#8E8E8E] truncate">{userEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-xs font-semibold text-[#0095F6] hover:text-[#262626] transition-colors"
              >
                {loggingOut ? "…" : "Sair"}
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#8E8E8E]">Sugestões para você</span>
              <a href="#" className="text-xs font-semibold text-[#262626] hover:text-[#8E8E8E]">Ver tudo</a>
            </div>

            {MOCK_POSTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#EFEFEF] flex items-center justify-center text-base">
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#262626]">{p.user}</p>
                  <p className="text-xs text-[#8E8E8E]">Sugerido para você</p>
                </div>
                <button className="text-xs font-semibold text-[#0095F6] hover:text-[#1877F2] transition-colors">
                  Seguir
                </button>
              </div>
            ))}

            <p className="text-[11px] text-[#C7C7C7] mt-6 leading-relaxed">
              Sobre · Ajuda · Privacidade · Termos · Locais · Idioma · Meta Verified
            </p>
            <p className="text-[11px] text-[#C7C7C7] mt-2">© 2024 INSTAGRAM FROM META</p>
          </div>
        </aside>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DBDBDB] flex justify-around items-center h-[49px] lg:hidden z-50">
        {[Home, Search, PlusSquare, Heart].map((Icon, i) => (
          <button key={i} className="text-[#262626] p-2">
            <Icon size={22} />
          </button>
        ))}
        <button className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F09433] via-[#DC2743] to-[#BC1888] flex items-center justify-center text-white text-[10px] font-bold m-1">
          {initials}
        </button>
      </nav>
    </div>
  );
}
