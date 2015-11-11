function getScreenType(width=320) {
  const tabletMin = 480 + 1;
  const desktopMin = 959 + 1;
  
  if (width < tabletMin) return 'handheld';
  if (width < desktopMin) return 'tablet';
  return 'desktop';
  
  return screen;
}

export default getScreenType;