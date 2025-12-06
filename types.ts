export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  audioUrl: string; // URL to the audio file
  genre: string;
  mood?: string;
}

export interface AiAnalysisResult {
  description: string;
  visualPrompt: string;
}
