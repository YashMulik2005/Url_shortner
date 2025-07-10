import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStaylinked } from "react-icons/fa";

function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoPaste, setAutoPaste] = useState(false);

  useEffect(() => {
    if (autoPaste) {
      navigator.clipboard.readText().then((text) => {
        setLongUrl(text);
      });
    }
  }, [autoPaste]);

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/url/short`,
        {
          originalUrl: longUrl,
        }
      );
      setShortUrl(response?.data?.data?.url);
      setCopied(false);
    } catch (err) {
      setError("Failed to shorten the URL. Try again.");
      console.error("Error:", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0b101b] via-[#161f36] to-[#212f52]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 text-white w-full h-full p-5 flex flex-col items-center">
        <div className="flex justify-start w-full">
          <section className="flex items-center gap-2 ">
            <FaStaylinked
              size={23}
              className="bg-gradient-to-r from-pink-500 via-pink-400 to-blue-600"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 to-blue-600 bg-clip-text text-transparent">
              Linkly
            </h1>
          </section>
        </div>

        <div className="w-full max-w-3xl bg-[#161f36] rounded-2xl shadow-2xl p-8 mt-20 relative">
          <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-pink-500 via-pink-400 to-blue-600 bg-clip-text text-transparent">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </p>

          <div className="flex items-center justify-center gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter the link here |"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full text-sm max-w-lg px-5 py-3 rounded-l-full bg-[#23263a] text-gray-200 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              onClick={handleShorten}
              className="px-6 py-3 text-sm hidden md:block rounded-r-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Shorten Now!
            </button>
            <button
              onClick={handleShorten}
              className="px-6 py-3 text-sm md:text-md md:hidden rounded-r-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Now!
            </button>
          </div>

          {error && (
            <div className="text-center text-red-400 text-sm mb-3">{error}</div>
          )}

          <div className="flex items-center justify-center gap-2 mb-6">
            <label className="flex items-center text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="accent-blue-500 mr-2"
                checked={autoPaste}
                onChange={() => setAutoPaste(!autoPaste)}
              />
              Auto Paste from Clipboard
            </label>
          </div>

          {shortUrl && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-300 mb-1">Your shortened URL:</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 w-full text-center text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Linkly — Simplifying Your Links, One
            Click at a Time.
          </span>
        </div>
      </div>
    </div>
  );
}

export default UrlShortener;
