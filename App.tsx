import React from 'react';
import { SongItem } from './components/SongItem';
import { Song } from './types';
import { Music, Mic2 } from 'lucide-react';

// 配置说明：
// 1. 将您的封面图片重命名为 "cover.jpg" 并放入 public 文件夹
// 2. 将您的两首歌曲文件重命名为 "song1.mp3" 和 "song2.mp3" 并放入 public 文件夹
//    (或者直接修改下方的 audioUrl 为您的文件链接)

const COMMON_COVER_URL = '/cover.jpg'; // 指向您上传的图片

const MY_SONGS: Song[] = [
  {
    id: '1',
    title: '原创歌曲 01', // 请修改为您第一首歌的名字
    artist: '我 (Original Artist)',
    duration: '--:--',
    genre: 'Pop',
    coverUrl: COMMON_COVER_URL,
    audioUrl: '/song1.mp3', // 假设您的第一首歌文件名
  },
  {
    id: '2',
    title: '原创歌曲 02', // 请修改为您第二首歌的名字
    artist: '我 (Original Artist)',
    duration: '--:--',
    genre: 'Ballad',
    coverUrl: COMMON_COVER_URL,
    audioUrl: '/song2.mp3', // 假设您的第二首歌文件名
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Simplified Header */}
      <header className="py-6 px-4 border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
          <Music size={20} className="text-gray-900" />
          <h1 className="text-lg font-bold text-gray-900 tracking-wide">我的原创音乐</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-12">
        
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            欢迎试听
          </h2>
          <p className="text-gray-500 leading-relaxed">
            这是我创作的两首歌曲，都在这里了。<br/>
            你可以试听，喜欢的话也可以直接下载。
          </p>
        </div>

        {/* Song List */}
        <div className="grid grid-cols-1 gap-6">
          {MY_SONGS.map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </div>

        {/* User Setup Guide (Visible only if needed, or keeping it subtle) */}
        <div className="mt-16 p-6 rounded-2xl bg-gray-50 text-gray-500 text-sm text-center border border-gray-100">
          <p className="font-medium mb-2 text-gray-700">👋 网站设置提示</p>
          <p>请确保已将您的封面图片命名为 <code>cover.jpg</code> 并放入项目文件夹。</p>
          <p className="mt-1">歌曲文件也请上传并确保路径正确。</p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} My Music Portfolio</p>
      </footer>
    </div>
  );
};

export default App;