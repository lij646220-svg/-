import React, { useState, useRef } from 'react';
import { Song } from '../types';
import { generateSongVibe } from '../services/geminiService';
import { Play, Pause, Download, Sparkles, Disc } from 'lucide-react';

interface SongItemProps {
  song: Song;
}

export const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleGenerateVibe = async () => {
    if (aiDescription) return;
    
    setIsLoadingAi(true);
    try {
      const result = await generateSongVibe(song.title, song.genre);
      setAiDescription(result.description);
    } catch (e) {
      setAiDescription("暂无法获取 AI 评论");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-4 items-center">
        {/* Album Art with Fallback */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 relative group bg-gray-100">
          {!imgError ? (
            <img 
              src={song.coverUrl} 
              alt={song.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Disc size={32} />
            </div>
          )}
          
          {/* Overlay Play Button */}
          <button 
            onClick={togglePlay}
            className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-white p-2 rounded-full shadow-lg">
               {isPlaying ? <Pause size={16} className="text-black" /> : <Play size={16} className="text-black ml-0.5" />}
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{song.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{song.artist}</p>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Play Button (Mobile) */}
            <button 
              onClick={togglePlay}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700"
            >
               {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Download Button */}
            <a 
              href={song.audioUrl} 
              download
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-xs font-medium"
            >
              <Download size={12} />
              下载
            </a>

            {/* AI Vibe Button */}
            <button 
              onClick={handleGenerateVibe}
              disabled={isLoadingAi || !!aiDescription}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                ${aiDescription 
                  ? 'bg-purple-50 text-purple-700 border-purple-100' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }
              `}
            >
              <Sparkles size={12} className={isLoadingAi ? 'animate-spin' : ''} />
              {isLoadingAi ? '...' : aiDescription ? '已解读' : 'AI 乐评'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Description Section */}
      {aiDescription && (
        <div className="mt-4 pt-4 border-t border-gray-50">
           <p className="text-gray-600 text-sm italic leading-relaxed">
              "{aiDescription}"
           </p>
        </div>
      )}

      <audio 
        ref={audioRef} 
        src={song.audioUrl} 
        onEnded={handleAudioEnded}
      />
    </div>
  );
};