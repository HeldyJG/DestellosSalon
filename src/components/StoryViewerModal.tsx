import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';
import { StoryHighlight } from '../types';

interface StoryViewerModalProps {
  highlight: StoryHighlight | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  highlight,
  onClose,
  onOpenBooking,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsLiked(false);
  }, [highlight]);

  useEffect(() => {
    if (!highlight) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < highlight.stories.length - 1) {
            setCurrentStoryIndex((curr) => curr + 1);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [highlight, currentStoryIndex, onClose]);

  if (!highlight) return null;

  const currentStory = highlight.stories[currentStoryIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStoryIndex < highlight.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A192F]/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm h-[85vh] max-h-[700px] bg-[#0A192F] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          {highlight.stories.map((story, idx) => (
            <div
              key={story.id}
              className="h-1 flex-1 bg-[#FAF8F5]/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-[#FAF8F5] transition-all duration-100 ease-linear"
                style={{
                  width:
                    idx < currentStoryIndex
                      ? '100%'
                      : idx === currentStoryIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 left-3 right-3 z-30 flex items-center justify-between text-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <img
              src={highlight.coverImage}
              alt={highlight.title}
              className="w-8 h-8 rounded-full border border-[#FAF8F5]/50 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-semibold leading-tight">
                {highlight.title}
              </p>
              <span className="text-[10px] text-[#FAF8F5]/70">
                AURA Atelier • {currentStory.timestamp}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#0A192F]/50 text-[#FAF8F5] hover:bg-[#0A192F]/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Media Image */}
        <div className="absolute inset-0 z-10 bg-[#0A192F]">
          <img
            src={currentStory.image}
            alt={currentStory.caption}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/60 via-transparent to-[#0A192F]/90 pointer-events-none" />
        </div>

        {/* Navigation Touch Areas */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-16 bottom-24 w-1/3 z-20 focus:outline-none flex items-center pl-2 opacity-0 hover:opacity-75 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-[#0A192F]/40 flex items-center justify-center text-[#FAF8F5]">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-16 bottom-24 w-1/3 z-20 focus:outline-none flex items-center justify-end pr-2 opacity-0 hover:opacity-75 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-[#0A192F]/40 flex items-center justify-center text-[#FAF8F5]">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>

        {/* Bottom Caption & Action */}
        <div className="relative z-30 mt-auto p-4 space-y-3">
          <p className="text-xs sm:text-sm text-[#FAF8F5] leading-snug drop-shadow-md">
            {currentStory.caption}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 bg-[#FAF8F5] text-[#0A192F] hover:bg-[#E5A9B4] hover:text-[#0A192F] py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D48B95]" />
              <span>Consultar / Agendar Cita</span>
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                isLiked
                  ? 'bg-[#D48B95] text-[#FAF8F5] border-[#D48B95]'
                  : 'bg-[#0A192F]/60 text-[#FAF8F5] border-[#FAF8F5]/20 hover:bg-[#0A192F]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
