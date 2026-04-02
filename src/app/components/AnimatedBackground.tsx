import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-moving-gradient pointer-events-none transition-colors duration-1000 dark:from-gray-900 dark:via-[#1e1b4b] dark:to-gray-900 from-indigo-50 via-white to-blue-50 bg-gradient-to-br">
      {/* Abstract Shapes */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/30 dark:bg-indigo-600/35 blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-float-slow" />
      <div className="absolute top-[35%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-400/25 dark:bg-blue-500/30 blur-[130px] mix-blend-multiply dark:mix-blend-screen animate-float" />
      <div className="absolute bottom-[-20%] left-[15%] w-[60%] h-[45%] rounded-full bg-violet-400/25 dark:bg-purple-600/30 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-float-fast" />
      
      {/* Subtle overlay grid or noise could be added here if desired */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
