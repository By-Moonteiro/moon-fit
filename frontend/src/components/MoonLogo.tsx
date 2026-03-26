export const MoonLogo = () => {
  return (
    <svg width="100%" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#c084fc"/>
          <stop offset="60%" stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#3b0764"/>
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <ellipse cx="340" cy="140" rx="90" ry="90" fill="url(#glowGrad)"/>
      <circle cx="340" cy="140" r="54" fill="url(#moonGrad)"/>
      <circle cx="322" cy="125" r="7" fill="#5b21b6" opacity="0.6"/>
      <circle cx="350" cy="155" r="4.5" fill="#4c1d95" opacity="0.5"/>
      <circle cx="335" cy="148" r="3" fill="#6d28d9" opacity="0.4"/>
      <circle cx="340" cy="140" r="54" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.4"/>

      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 340 140" to="360 340 140" dur="4s" repeatCount="indefinite"/>
        <g transform="translate(340, 68)">
          <rect x="-18" y="-5" width="36" height="10" rx="3" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1"/>
          <rect x="-26" y="-8" width="10" height="16" rx="3" fill="#c084fc" stroke="#a855f7" strokeWidth="1"/>
          <rect x="16" y="-8" width="10" height="16" rx="3" fill="#c084fc" stroke="#a855f7" strokeWidth="1"/>
          <rect x="-31" y="-5.5" width="7" height="11" rx="2" fill="#a855f7"/>
          <rect x="24" y="-5.5" width="7" height="11" rx="2" fill="#a855f7"/>
        </g>
      </g>

      <circle cx="340" cy="140" r="76" fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4"/>
      <circle cx="412" cy="100" r="2" fill="#c084fc" opacity="0.6">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="268" cy="180" r="1.5" fill="#a78bfa" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="420" cy="175" r="1.5" fill="#c084fc" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="260" cy="105" r="2" fill="#a855f7" opacity="0.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}