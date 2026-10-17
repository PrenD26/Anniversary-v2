// Koala (Kyla) dan kucing oyen (Frend). mood: 'happy' | 'sad'

function Face({ sad, tone }) {
  return (
    <>
      {/* mata besar + kilau */}
      <ellipse cx="36" cy="55" rx="5.5" ry="7" fill="#2a1f45" />
      <ellipse cx="64" cy="55" rx="5.5" ry="7" fill="#2a1f45" />
      <circle cx="38" cy="52" r="2.2" fill="#fff" />
      <circle cx="66" cy="52" r="2.2" fill="#fff" />
      <circle cx="34.5" cy="58" r="1" fill="#fff" />
      <circle cx="62.5" cy="58" r="1" fill="#fff" />
      <circle cx="24" cy="68" r="5.5" fill="#f7a8c8" opacity=".65" />
      <circle cx="76" cy="68" r="5.5" fill="#f7a8c8" opacity=".65" />
      {sad && (
        <>
          <path d="M27 44L43 49M73 44L57 49" stroke="#2a1f45" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 64q-3 6 0 9q3-3 0-9z" fill="#8ed0f5" />
        </>
      )}
      {tone}
    </>
  )
}

export function Koala({ mood = 'happy', size = 110 }) {
  const sad = mood === 'sad'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Koala">
      <circle cx="19" cy="31" r="18" fill="#b9a9d9" />
      <circle cx="81" cy="31" r="18" fill="#b9a9d9" />
      <circle cx="19" cy="31" r="10" fill="#f0e6fb" />
      <circle cx="81" cy="31" r="10" fill="#f0e6fb" />
      <circle cx="50" cy="57" r="37" fill="#d4c6ea" />
      <Face
        sad={sad}
        tone={
          <>
            <ellipse cx="50" cy="63" rx="8" ry="6" fill="#4a3a6b" />
            <path
              d={sad ? 'M44 77Q50 72 56 77' : 'M44 71Q50 78 56 71'}
              fill="none"
              stroke="#4a3a6b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        }
      />
    </svg>
  )
}

export function Cat({ mood = 'happy', size = 110 }) {
  const sad = mood === 'sad'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Kucing oyen">
      <polygon points="12,46 19,8 47,27" fill="#f08a3c" />
      <polygon points="88,46 81,8 53,27" fill="#f08a3c" />
      <polygon points="20,38 23,19 38,29" fill="#f8b6c4" />
      <polygon points="80,38 77,19 62,29" fill="#f8b6c4" />
      <circle cx="50" cy="58" r="37" fill="#f9a95c" />
      <path d="M44 24v9M50 22v11M56 24v9" stroke="#e0782a" strokeWidth="3.5" strokeLinecap="round" />
      <Face
        sad={sad}
        tone={
          <>
            <path d="M46 63h8l-4 4z" fill="#f08aa8" />
            <path
              d={sad ? 'M43 78Q50 72 57 78' : 'M42 72Q46 78 50 72Q54 78 58 72'}
              fill="none"
              stroke="#4a3a6b"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M8 60l14 2M8 68l14-3M92 60l-14 2M92 68l-14-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </>
        }
      />
    </svg>
  )
}
