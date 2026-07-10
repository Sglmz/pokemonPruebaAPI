const ICON_PATHS = {
  Fire: (
    <path
      d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c1 1 2 2.5 2 4.5A6 6 0 1 1 8 13.5c0-1 .3-1.8.8-2.6C10 9 11 6 12 2Z"
      strokeLinejoin="round"
    />
  ),
  Water: (
    <path
      d="M12 3c3 4 6 7.6 6 11.2A6 6 0 0 1 6 14.2C6 10.6 9 7 12 3Z"
      strokeLinejoin="round"
    />
  ),
  Grass: (
    <path
      d="M5 20c0-6 3-9 3-13 4 1 7 4 7 9 0 2-1 4-3 5M12 16c2-3 5-4 8-3-1 4-4 6-8 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Lightning: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" />,
  Psychic: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),
  Fighting: (
    <path
      d="M7 13V8a2 2 0 1 1 4 0v3M11 11V6a2 2 0 1 1 4 0v5M15 11.5V8a2 2 0 1 1 4 0v6c0 4-2.5 7-6.5 7-3 0-4.7-1.4-6-3l-2.7-4a1.6 1.6 0 0 1 2.6-1.8L8 14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Darkness: (
    <path
      d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  Dragon: (
    <path
      d="M3 12c2-5 6-8 11-8 4 0 7 3 7 6-3-1-5 0-6 2 2 0 3 1 3 3-2-1-4-1-5 1-1-2-3-2-4-1 1-2 0-4-2-4-1 3-2 4-4 4 1-1 1-2 0-3Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const TypeIcon = ({ type }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    {ICON_PATHS[type] || <circle cx="12" cy="12" r="8" />}
  </svg>
);

export default TypeIcon;
