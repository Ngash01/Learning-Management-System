"use client"
import Confetti from 'react-confetti'


export const ConfettiStore =  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces= {900}
      recycle={false}
      initialVelocityX={6}
      tweenDuration={15000}
    />
  )
}



