// Shared Framer Motion animation variants — use across all pages

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -32 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: 32 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.92 },
};

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 40 },
};

// Stagger container — apply on a parent to stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// Stagger child — apply on each child inside a stagger container
export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const staggerChildTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

// Page transition — wrap every page content with this
export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// Card hover — use on motion.div for cards
export const cardHover = {
  whileHover: { y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', transition: { duration: 0.2 } },
  whileTap:   { scale: 0.98 },
};

// Button press
export const buttonTap = {
  whileTap: { scale: 0.96 },
};

// Number count-up spring
export const springConfig = { type: 'spring', stiffness: 200, damping: 20 } as const;

// Transition presets
export const smooth = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } as const;
export const fast   = { duration: 0.2, ease: 'easeOut' as const } as const;
export const spring = { type: 'spring', stiffness: 300, damping: 24 } as const;
