export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)" }}
      className="w-full border-t border-[var(--border-color)] shadow-inner mt-auto"
    >
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col items-center gap-1">
        <span className="text-sm tracking-wide">© ARC 2025</span>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfwDea1_VSwGcG6XPIhYq53I7yKVRpKQPKejQwl3lXnUKyjQQ/viewform?usp=preview"
          className="text-sm underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-primary)" }}
          target="_blank"
        >
          Contact us
        </a>
      </div>
    </footer>
  );
}
