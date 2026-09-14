import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Calendar, Music, Sparkles, CheckCircle2 } from 'lucide-react';
import { SocialPost } from '../types';

interface SocialPostModalProps {
  post: SocialPost | null;
  onClose: () => void;
  onBookThisLook: (post: SocialPost) => void;
}

export const SocialPostModal: React.FC<SocialPostModalProps> = ({
  post,
  onClose,
  onBookThisLook,
}) => {
  const [likes, setLikes] = useState<number>(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    '¡Qué maravilla de degradado! ¿Qué tono es exactamente?',
    'Me encanta el brillo natural que tiene, ¿cuánto dura el tratamiento?',
    'Acabo de reservar para el viernes, ¡qué ganas!',
  ]);
  const [newComment, setNewComment] = useState('');
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, newComment.trim()]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A192F]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] border border-[#E8E2D8] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#0A192F]/60 md:bg-[#0A192F]/10 text-[#FAF8F5] md:text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FAF8F5] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Media Display */}
        <div className="md:w-7/12 bg-[#0A192F] relative min-h-[300px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover max-h-[60vh] md:max-h-none"
            referrerPolicy="no-referrer"
          />

          {/* Social Platform watermark badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0A192F]/80 backdrop-blur-md text-[#FAF8F5] border border-[#FAF8F5]/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D48B95]" />
              {post.platform === 'instagram' ? 'Instagram Post' : 'TikTok Viral'}
            </span>
            {post.isPinned && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#D48B95] text-[#FAF8F5]">
                Destacado
              </span>
            )}
          </div>

          {/* Audio Bar (for Reels/TikTok) */}
          {post.audioTitle && (
            <div className="absolute bottom-4 left-4 right-4 bg-[#0A192F]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#FAF8F5]/10 flex items-center gap-2 text-[#FAF8F5] text-xs">
              <Music className="w-3.5 h-3.5 text-[#E5A9B4] animate-pulse" />
              <span className="truncate text-[11px] text-[#FAF8F5]/90">{post.audioTitle}</span>
            </div>
          )}
        </div>

        {/* Right Side: Post Info, Caption, Comments, Booking CTA */}
        <div className="md:w-5/12 flex flex-col justify-between p-5 sm:p-6 bg-[#FAF8F5] overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          {/* Header Author Info */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full border border-[#D48B95] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-sm text-[#0A192F]">
                      {post.authorName}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D48B95] fill-current text-white" />
                  </div>
                  <span className="text-xs text-[#0A192F]/60">{post.handle}</span>
                </div>
              </div>
              <span className="text-[11px] text-[#0A192F]/50 font-medium">
                {post.date}
              </span>
            </div>

            {/* Stylist & Category Chips */}
            <div className="flex flex-wrap items-center gap-2 my-3">
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#F4EFEA] text-[#0A192F] font-medium border border-[#E8E2D8]">
                Estilista: <strong className="font-semibold text-[#0A192F]">{post.stylistName}</strong>
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#D48B95] font-medium border border-[#D48B95]/30">
                {post.serviceCategory}
              </span>
            </div>

            {/* Post Caption */}
            <div className="text-xs sm:text-sm text-[#0A192F]/85 space-y-2 leading-relaxed">
              <p>{post.caption}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] text-[#152744] hover:text-[#D48B95] font-medium cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Micro Comments Feed */}
            <div className="mt-4 pt-3 border-t border-[#E8E2D8]">
              <span className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider block mb-2">
                Comentarios ({comments.length})
              </span>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {comments.map((comment, idx) => (
                  <div key={idx} className="text-xs bg-[#FFFFFF] p-2 rounded-lg border border-[#E8E2D8]/70">
                    <p className="text-[#0A192F]/80">{comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mt-2.5 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Añade un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-[#FFFFFF] border border-[#E8E2D8] rounded-lg px-3 py-1.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                />
                <button
                  type="submit"
                  className="text-xs bg-[#0A192F] text-[#FAF8F5] px-3 py-1.5 rounded-lg font-medium hover:bg-[#152744] cursor-pointer"
                >
                  Publicar
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Actions & Conversion CTA */}
          <div className="pt-4 border-t border-[#E8E2D8] mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#0A192F]">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1.5 font-medium hover:text-[#D48B95] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform active:scale-125 ${
                      isLiked ? 'fill-[#D48B95] text-[#D48B95]' : ''
                    }`}
                  />
                  <span>{likes.toLocaleString()} likes</span>
                </button>
                <span className="flex items-center gap-1 text-[#0A192F]/70">
                  <MessageCircle className="w-4 h-4" />
                  {comments.length}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-[#0A192F]/70 hover:text-[#0A192F] transition-colors cursor-pointer"
                title="Copiar enlace"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
              </button>
            </div>

            {/* Direct Conversion Button */}
            <button
              id="btn-modal-agendar-look"
              onClick={() => onBookThisLook(post)}
              className="w-full bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5A9B4]" />
              <span>Quiero este Look (Agendar con {post.stylistName})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
