import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShortNotes = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!link) {
      setError("Please enter a YouTube link first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setCopied(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transcript/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: link }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to generate summary. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Complex Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full mix-blend-screen filter blur-[150px] opacity-60 animate-blob z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-accent/10 rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob animation-delay-4000 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 opacity-40 pointer-events-none"></div>

      {/* Massive Gradient Text Header instead of Image */}
      <div className="mb-12 mt-6 text-center z-10 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse drop-shadow-[0_0_25px_rgba(16,97,45,0.6)]">
          Notes Maker AI
        </h1>
        <p className="text-xl md:text-2xl text-base-content/80 font-medium tracking-wide">
          Turn any lecture into <span className="text-primary font-bold">structured intelligence.</span>
        </p>
      </div>

      {/* Input Card */}
      <div className={`w-full transition-all duration-700 ease-in-out z-10 ${summary ? 'opacity-90 scale-95 max-w-3xl' : 'opacity-100 scale-100 max-w-4xl'}`}>
        <div className="card bg-base-100/50 backdrop-blur-2xl shadow-2xl border border-base-300 relative overflow-hidden">
          {/* Glowing animated border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 blur-xl animate-pulse -z-10"></div>
          
          <div className="card-body items-center text-center p-8 lg:p-12">
            <h2 className="text-4xl font-extrabold mb-3 flex items-center gap-3 drop-shadow-md">
              <span className="text-primary">🤖</span> AI YouTube Summarizer
            </h2>
            <p className="text-base-content/80 text-lg mb-8 max-w-xl">
              Paste any YouTube lecture link below. Our AI will instantly scan the video and generate beautifully structured, comprehensive study notes.
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className="input input-lg flex-grow bg-base-200/60 backdrop-blur-sm border border-base-300 shadow-inner focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-xl placeholder:text-base-content/40 rounded-full px-8"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                className="btn btn-primary btn-lg rounded-full shadow-[0_0_20px_rgba(16,97,45,0.4)] hover:shadow-[0_0_30px_rgba(16,97,45,0.7)] border-none px-10 text-lg group relative overflow-hidden shrink-0"
                onClick={handleGenerate}
                disabled={loading}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {loading ? <span className="loading loading-spinner loading-md"></span> : 'Scan Video'}
              </button>
            </div>

            {error && (
              <div className="alert alert-error shadow-lg mt-6 rounded-2xl animate-bounce">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="w-full max-w-4xl mt-10 z-10 animate-fade-in-up">
           <div className="card bg-base-100/40 backdrop-blur-md shadow-2xl border border-base-300 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                   <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content/80">Scanning Audio Transcript...</h3>
                  <p className="text-sm text-base-content/50">This usually takes 10-15 seconds for a 1 hour lecture.</p>
                </div>
              </div>
              <div className="space-y-4">
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse w-3/4"></div>
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse"></div>
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse w-5/6"></div>
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse w-1/2 mt-8"></div>
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse"></div>
                 <div className="h-4 bg-base-300/50 rounded-full animate-pulse w-4/5"></div>
              </div>
           </div>
        </div>
      )}

      {/* Summary Output */}
      {summary && !loading && (
        <div className="w-full max-w-5xl mt-12 z-10 animate-fade-in-up">
          <div className="card bg-base-100/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-primary/20">
            <div className="card-body p-8 lg:p-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-base-300 pb-6 mb-6 gap-4">
                <h3 className="text-3xl font-extrabold flex items-center gap-3">
                  <span className="text-primary drop-shadow-[0_0_10px_rgba(16,97,45,0.8)]">✨</span> 
                  Structured Notes
                </h3>
                <button 
                  onClick={handleCopy} 
                  className={`btn rounded-full px-6 shadow-md transition-all ${copied ? 'btn-success text-success-content' : 'btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content'}`}
                >
                  {copied ? '✓ Copied!' : '📋 Copy Notes'}
                </button>
              </div>
              
              <div className="prose prose-lg lg:prose-xl max-w-none text-base-content prose-headings:text-primary prose-a:text-accent prose-strong:text-base-content prose-strong:font-extrabold">
                <div className="whitespace-pre-wrap font-medium leading-relaxed bg-base-200/30 p-6 rounded-2xl shadow-inner border border-base-200/50">
                  {summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShortNotes;