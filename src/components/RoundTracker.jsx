function RoundTracker({ currentRound, totalRounds }) {
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem auto' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '0.85rem',
        color: '#aaa',
        letterSpacing: '2px'
      }}>
        <span>ROUND</span>
        <span>{currentRound} / {totalRounds}</span>
      </div>

      <div style={{
        width: '100%',
        height: '4px',
        background: '#222',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${(currentRound / totalRounds) * 100}%`,
          background: 'linear-gradient(to right, #6366f1, #ec4899)',
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '12px',
        gap: '8px'
      }}>
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: '8px',
            borderRadius: '4px',
            background: i < currentRound ? 'linear-gradient(to right, #6366f1, #ec4899)' : '#222',
            transition: 'background 0.4s ease'
          }} />
        ))}
      </div>

    </div>
  )
}

export default RoundTracker