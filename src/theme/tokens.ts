export const colors = {
    background: '#161618',
    surface: 'rgba(255,255,255,0.06)',
    surfaceElevated: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.10)',
    borderStrong: 'rgba(255,255,255,0.18)',
  
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.55)',
    textTertiary: 'rgba(255,255,255,0.40)',
  
    buttonPrimaryBg: '#ffffff',
    buttonPrimaryText: '#000000',
    buttonSecondaryBg: 'rgba(28,28,30,0.6)',

    glassCard: 'rgba(20,20,20,0.80)',
    overlayGradientStart: 'rgba(0,0,0,0.5)',
    overlayGradientEnd: 'rgba(0,0,0,0.85)',
  } as const;
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
    xxl: 32,
  } as const;
  
  export const radius = {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    xxl: 28,
    full: 999,
  } as const;
  
  export const typography = {
    display: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.03 },
    title: { fontSize: 22, fontWeight: '600' as const, letterSpacing: -0.02 },
    body: { fontSize: 15, fontWeight: '400' as const },
    caption: { fontSize: 12, fontWeight: '500' as const },
  } as const;
  