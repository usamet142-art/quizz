import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ShareButton({ title, text, url, result, className = '' }) {
  const [copied, setCopied] = useState(false);
  const shareUrl  = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = text || `${title} — Découvre ton résultat sur Quizify ! 🧠`;

  function buildWhatsAppUrl() {
    return `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  }
  function buildTikTokUrl() {
    return `https://www.tiktok.com/`;
  }
  function buildSnapchatUrl() {
    return `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}`;
  }
  function buildTwitterUrl() {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  }
  function buildFacebookUrl() {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        toast.success('Partagé !');
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Lien copié ! 🔗');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Impossible de copier le lien');
    }
  }

  const buttons = [
    {
      label: 'WhatsApp',
      icon: '💬',
      bg: 'bg-green-600 hover:bg-green-500',
      href: buildWhatsAppUrl(),
      external: true,
    },
    {
      label: 'Twitter/X',
      icon: '🐦',
      bg: 'bg-sky-600 hover:bg-sky-500',
      href: buildTwitterUrl(),
      external: true,
    },
    {
      label: 'Facebook',
      icon: '📘',
      bg: 'bg-blue-700 hover:bg-blue-600',
      href: buildFacebookUrl(),
      external: true,
    },
    {
      label: copied ? 'Copié !' : 'Copier',
      icon: copied ? '✅' : '🔗',
      bg: 'bg-white/10 hover:bg-white/20',
      onClick: copyLink,
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-center text-sm font-semibold text-white/60">
        🚀 Partage ton résultat à tes amis !
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {buttons.map(btn => (
          btn.href ? (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl ${btn.bg} font-medium text-sm transition-colors text-white`}
            >
              <span>{btn.icon}</span>
              <span className="hidden sm:inline">{btn.label}</span>
            </a>
          ) : (
            <button
              key={btn.label}
              onClick={btn.onClick}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl ${btn.bg} font-medium text-sm transition-colors text-white`}
            >
              <span>{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          )
        ))}
      </div>

      {/* Native share on mobile */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="w-full py-3 rounded-xl border-2 border-purple-500/50 text-purple-300 font-semibold text-sm hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
        >
          <span>📤</span>
          Partager via...
        </button>
      )}
    </div>
  );
}
