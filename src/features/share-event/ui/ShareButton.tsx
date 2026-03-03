export function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lien copié !");
    }
  };

  return <button onClick={handleShare}>Partager</button>;
}