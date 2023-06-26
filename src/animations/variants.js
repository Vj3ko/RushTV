export const headerVariant = {
  closed: {
    height: 0,
  },
  open: {
    height: 'auto',
    transition: { duration: 0.5 },
  },
  exit: {
    height: 0,
    transition: { duration: 0.5 },
  },
};

export const navVariant = {
  closed: {
    height: 0,
  },
  open: {
    height: 'auto',
    transition: { duration: 0.2 },
  },
  exit: {
    height: 0,
    transition: { duration: 0.2 },
  },
};

export const menuBtnVariant = {
  closed: { scale: 0.6 },
  open: { scale: 1 },
  exit: { scale: 0.6 },
};

export const cardVariant = {
  rest: {
    scale: 1,
    transition: { duration: 0.3, type: 'tween', ease: 'easeIn' },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, type: 'tween', ease: 'easeIn' },
  },
};

export const modalVariant = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const overviewVariant = {
  shrink: {
    height: 60,
    transition: { height: 0.3 },
  },
  grow: {
    height: 'auto',
    transition: { height: 0.3 },
  },
};

export const overviewBtnVariant = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const pageVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.2 },
  },
  exit: {
    opacity: 0,
  },
};
