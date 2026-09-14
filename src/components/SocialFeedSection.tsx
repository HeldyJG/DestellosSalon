import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Video, Image as ImageIcon, Heart, MessageCircle, ArrowUpRight, CheckCircle2, Play } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SOCIAL_POSTS, STORY_HIGHLIGHTS } from '../data/previewData';
import { SocialPost, StoryHighlight } from '../types';
import { SocialPostModal } from './SocialPostModal';
import { StoryViewerModal } from './StoryViewerModal';

interface SocialFeedSectionProps {
  onOpenBooking: (serviceName?: string, stylistName?: string, customNote?: string) => void;
}

export const SocialFeedSection: React.FC<SocialFeedSectionProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all'>('all');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryHighlight | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Todos los videos' },
  ];

  const filteredPosts = SOCIAL_POSTS;

  const handleBookFromPost = (post: SocialPost) => {
    setSelectedPost(null);
    onOpenBooking(
      post.serviceCategory,
      post.stylistName,
      `Inspiración de Instagram/TikTok: "${post.caption.slice(0, 70)}..." (${post.handle})`
    );
  };

  return (
    <section id="social" className="py-20 bg-[#FAF8F5] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <Instagram className="w-3.5 h-3.5 text-[#D48B95]" />
            <span>Portafolio social de muestra</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            Nuestras Redes en Destellos Salón
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Una selección visual construida con trabajos del salón. Las métricas y fechas son referenciales para mostrar cómo lucirá el feed final.
          </p>
        </div>

        {/* Instagram Profile Card Header */}
        <div className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Avatar & Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 bg-gradient-to-tr from-[#D48B95] via-[#E5A9B4] to-[#0A192F]">
                  <img
                    src="/img/logo.png"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logo.svg';
                    }}
                    alt="Destellos Salón Oficial Instagram"
                    className="w-full h-full rounded-full object-cover border-2 border-[#FFFFFF] bg-[#FAF8F5]"
                  />
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#D48B95] border-2 border-white flex items-center justify-center text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-lg text-[#0A192F]">
                    {SALON_INFO.instagram}
                  </h3>
                  <span className="text-xs bg-[#F4EFEA] text-[#0A192F] px-2 py-0.5 rounded-full font-medium border border-[#E8E2D8]">
                    Cuenta Oficial
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0A192F]/80 max-w-md">
                  {SALON_INFO.subtitle} • {SALON_INFO.address}. Especialistas en Balayage, Mechas y Alisados de Keratina.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-5 pt-1 text-xs text-[#0A192F]/70">
                  <span><strong>+450</strong> publicaciones</span>
                  <span><strong>Comunidad</strong> activa</span>
                  <span><strong>Chiclayo</strong> Perú</span>
                </div>
              </div>
            </div>

            {/* Right: Social External Links */}
            <div className="flex items-center gap-3">
              <a
                href={SALON_INFO.instagramUrl || "https://www.instagram.com/destellossalon.chiclayo/"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#E5A9B4]" />
                <span>Seguir en Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F5]/60" />
              </a>
              <a
                href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFFFFF] hover:bg-[#F4EFEA] border border-[#E8E2D8] text-[#0A192F] px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>WhatsApp: {SALON_INFO.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Stories Highlights Row */}
          <div className="mt-6 pt-5 border-t border-[#E8E2D8]">
            <div className="text-xs font-semibold text-[#0A192F]/60 uppercase tracking-wider mb-3">
              Historias Destacadas del Atelier (Toca para ver)
            </div>
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
              {STORY_HIGHLIGHTS.map((highlight) => (
                <button
                  key={highlight.id}
                  onClick={() => setSelectedStory(highlight)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none flex-shrink-0"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 border-2 border-dashed border-[#D48B95] group-hover:border-solid group-hover:scale-105 transition-all">
                    <img
                      src={highlight.coverImage}
                      alt={highlight.title}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#0A192F] group-hover:text-[#D48B95] transition-colors whitespace-nowrap">
                    {highlight.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0A192F] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0A192F]/80 hover:bg-[#F4EFEA] border border-[#E8E2D8]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Social Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => !post.tiktokId && setSelectedPost(post)}
              className={`group bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col ${post.tiktokId ? '' : 'cursor-pointer'}`}
            >
              {/* Image Container with hover overlay */}
              <div className="relative aspect-square overflow-hidden bg-[#0A192F]">
                {post.tiktokId ? (
                  <iframe
                    src={`https://www.tiktok.com/player/v1/${post.tiktokId}?autoplay=1&loop=1&controls=1&rel=0&muted=1`}
                    title={`TikTok de ${post.authorName}`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full border-0 bg-black"
                  />
                ) : (
                  <img
                    src={post.thumbnail}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Platform Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#0A192F]/80 backdrop-blur-md text-[#FAF8F5] flex items-center gap-1">
                    {post.platform === 'tiktok' ? (
                      <>
                        <Video className="w-3 h-3 text-[#E5A9B4]" />
                        <span>TikTok</span>
                      </>
                    ) : (
                      <>
                        <Instagram className="w-3 h-3 text-[#E5A9B4]" />
                        <span>Instagram</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Media Type Indicator (Video play button icon) */}
                {post.mediaType === 'video' && !post.tiktokId && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#0A192F]/80 backdrop-blur-md flex items-center justify-center text-[#FAF8F5]">
                    <Play className="w-3 h-3 fill-current text-[#E5A9B4] ml-0.5" />
                  </div>
                )}

                {/* Hover Quick Stats Overlay */}
                {!post.tiktokId && (
                  <div className="absolute inset-0 bg-[#0A192F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-[#FAF8F5] gap-3">
                    <div className="flex items-center gap-5 text-sm font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 fill-[#D48B95] text-[#D48B95]" />
                        {post.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        {post.commentsCount}
                      </span>
                    </div>
                    <span className="text-xs bg-[#FAF8F5] text-[#0A192F] px-3.5 py-1.5 rounded-full font-semibold">
                      Ver publicación completa & Look
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Card Snippet */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0A192F]">
                      {post.stylistName}
                    </span>
                    <span className="text-[#0A192F]/50">{post.date}</span>
                  </div>
                  <p className="text-xs text-[#0A192F]/80 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-[#D48B95] bg-[#F9ECEE] px-2 py-0.5 rounded">
                    {post.serviceCategory}
                  </span>
                  {post.tiktokId && post.tiktokUrl ? (
                    <a
                      href={post.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="text-[11px] font-semibold text-[#0A192F] hover:text-[#D48B95] transition-colors"
                    >
                      Abrir en TikTok ↗
                    </a>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#0A192F] group-hover:text-[#D48B95] transition-colors flex items-center gap-1">
                      Pedir este estilo →
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Post Detail Modal */}
      <SocialPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onBookThisLook={handleBookFromPost}
      />

      {/* Story Viewer Modal */}
      <StoryViewerModal
        highlight={selectedStory}
        onClose={() => setSelectedStory(null)}
        onOpenBooking={() => onOpenBooking()}
      />
    </section>
  );
};
