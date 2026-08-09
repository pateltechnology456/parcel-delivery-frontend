"use client";

import { motion } from "framer-motion";

export function DeliveryAnimation() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-[10px] bg-[#f8fafc] border border-[rgba(0,0,0,0.05)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-end justify-center">
      {/* Background Skyline */}
      <motion.svg
        className="absolute bottom-[40px] left-0 w-[200%] opacity-50"
        viewBox="0 0 1200 150"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        <path d="M0,150 L0,100 L15,100 L15,70 L35,70 L35,110 L50,110 L50,50 L80,50 L80,90 L110,90 L110,30 L150,30 L150,80 L180,80 L180,20 L230,20 L230,100 L260,100 L260,40 L310,40 L310,90 L340,90 L340,60 L390,60 L390,120 L420,120 L420,70 L470,70 L470,130 L500,130 L500,40 L550,40 L550,100 L580,100 L580,60 L600,60 L600,150 Z" fill="#e2e8f0" />
        <path d="M600,150 L600,100 L615,100 L615,70 L635,70 L635,110 L650,110 L650,50 L680,50 L680,90 L710,90 L710,30 L750,30 L750,80 L780,80 L780,20 L830,20 L830,100 L860,100 L860,40 L910,40 L910,90 L940,90 L940,60 L990,60 L990,120 L1020,120 L1020,70 L1070,70 L1070,130 L1100,130 L1100,40 L1150,40 L1150,100 L1180,100 L1180,60 L1200,60 L1200,150 Z" fill="#e2e8f0" />
      </motion.svg>
      
      {/* Clouds */}
      <motion.svg className="absolute top-[30px] left-[10%] w-[120px] h-[40px] opacity-40" viewBox="0 0 100 40" animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}>
        <path d="M20,20 Q30,5 50,20 Q70,5 80,20 Q95,20 90,35 L10,35 Q5,20 20,20 Z" fill="#cbd5e1" />
      </motion.svg>
      <motion.svg className="absolute top-[50px] right-[20%] w-[150px] h-[50px] opacity-30" viewBox="0 0 100 40" animate={{ x: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}>
        <path d="M20,20 Q30,5 50,20 Q70,5 80,20 Q95,20 90,35 L10,35 Q5,20 20,20 Z" fill="#cbd5e1" />
      </motion.svg>

      {/* Ground Line */}
      <div className="absolute bottom-[40px] w-full h-[3px] bg-[#e2e8f0]" />

      <div className="relative z-10 w-full h-full max-w-[700px] flex items-end">
        {/* Yellow Boxes */}
        <motion.div
          className="absolute bottom-[40px] left-[15%]"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.5 }}
        >
          <svg width="90" height="110" viewBox="0 0 100 120" className="drop-shadow-md">
            {/* Top Box */}
            <rect x="25" y="10" width="50" height="40" fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
            <line x1="50" y1="10" x2="50" y2="25" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M45,35 L50,30 L55,35" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="50" y1="30" x2="50" y2="42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            
            {/* Bottom Box */}
            <rect x="10" y="50" width="80" height="60" fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
            <line x1="50" y1="50" x2="50" y2="70" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M35,90 L40,85 L45,90" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="40" y1="85" x2="40" y2="100" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            
            <path d="M55,90 L60,85 L65,90" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="60" y1="85" x2="60" y2="100" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Truck */}
        <motion.div
          className="absolute bottom-[40px] right-[10%]"
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.2 }}
        >
          <svg width="220" height="130" viewBox="0 0 220 130" className="drop-shadow-lg">
            {/* Container Box */}
            <rect x="80" y="15" width="130" height="85" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2.5" rx="2" />
            {/* Container Vertical Lines */}
            <line x1="95" y1="15" x2="95" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="110" y1="15" x2="110" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="125" y1="15" x2="125" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="140" y1="15" x2="140" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="155" y1="15" x2="155" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="170" y1="15" x2="170" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="185" y1="15" x2="185" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="200" y1="15" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Container Blue Base */}
            <rect x="80" y="75" width="130" height="25" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
            
            {/* Porter Logo Plate */}
            <rect x="120" y="40" width="55" height="22" fill="#fff" stroke="#1e293b" strokeWidth="2" rx="2" />
            <text x="127" y="55" fontSize="11" fontWeight="bold" fill="#3b82f6" fontFamily="sans-serif">PORTER</text>
            
            {/* Cab */}
            <path d="M80,100 L80,45 L40,45 Q20,45 15,65 L5,90 Q5,100 15,100 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
            
            {/* Window */}
            <path d="M70,53 L42,53 Q33,53 28,65 L22,78 L70,78 Z" fill="#fff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
            
            {/* Headlight */}
            <path d="M5,80 L12,80 L12,90 L5,90 Z" fill="#fef08a" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* Wheels */}
            <circle cx="45" cy="105" r="14" fill="#1e293b" />
            <circle cx="45" cy="105" r="6" fill="#94a3b8" />
            
            <circle cx="170" cy="105" r="14" fill="#1e293b" />
            <circle cx="170" cy="105" r="6" fill="#94a3b8" />
          </svg>
        </motion.div>

        {/* Delivery Person */}
        <motion.div
          className="absolute bottom-[40px] left-[50%] -translate-x-[50%]"
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 2.2, type: "spring", bounce: 0.3 }}
        >
          <svg width="130" height="170" viewBox="0 0 150 190" className="drop-shadow-lg">
            {/* Right Arm (behind back) */}
            <path d="M100,90 L115,120 L115,140" fill="none" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M100,90 L115,120 L115,140" fill="none" stroke="#3b82f6" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115,140 L115,150" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
            <path d="M115,140 L115,150" fill="none" stroke="#fef08a" strokeWidth="7" strokeLinecap="round" />

            {/* Torso */}
            <path d="M40,90 Q75,70 110,90 L115,190 L35,190 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
            <line x1="75" y1="85" x2="75" y2="190" stroke="#2563eb" strokeWidth="2" opacity="0.3" />
            
            {/* Neck */}
            <rect x="68" y="70" width="14" height="20" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
            
            {/* Head */}
            <rect x="52" y="32" width="46" height="42" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" rx="12" />
            
            {/* Eyes */}
            <line x1="62" y1="52" x2="62" y2="56" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <line x1="88" y1="52" x2="88" y2="56" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            
            {/* Smile */}
            <path d="M66,62 Q75,70 84,62" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Cap */}
            <path d="M50,38 Q75,20 100,38 L105,45 L45,45 Z" fill="#2563eb" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M98,35 Q108,35 112,42" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="75" cy="22" r="4" fill="#1e293b" />
            
            {/* Left Arm & Thumbs up */}
            <path d="M45,95 L25,120 L15,110" fill="none" stroke="#1e293b" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45,95 L25,120 L15,110" fill="none" stroke="#3b82f6" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Thumb up Hand */}
            <circle cx="15" cy="110" r="12" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
            {/* Thumb */}
            <path d="M12,100 L12,85" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
            <path d="M12,100 L12,85" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
            {/* Fingers */}
            <line x1="6" y1="110" x2="20" y2="110" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="5" y1="115" x2="18" y2="115" stroke="#1e293b" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
