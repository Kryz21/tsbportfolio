import { motion, useTransform } from 'framer-motion'

const shardData = [
  ['-42%', '-36%', -18, 0.9],
  ['23%', '-45%', 16, 0.68],
  ['48%', '-5%', 38, 0.78],
  ['31%', '40%', -20, 0.62],
  ['-7%', '52%', 11, 0.84],
  ['-49%', '23%', 28, 0.7],
  ['-58%', '-7%', -34, 0.54],
  ['-4%', '-57%', 8, 0.64]
]

export default function Artifact({ progress, mode = 'hero', label = 'TSB', image = null }) {
  const rotateY = useTransform(progress, [0, 1], [-18, 210])
  const rotateX = useTransform(progress, [0, 0.55, 1], [7, -12, 18])
  const scale = useTransform(progress, [0, 0.35, 0.8, 1], [0.9, 1.08, 0.78, 0.62])
  const y = useTransform(progress, [0, 0.45, 1], ['4vh', '-2vh', '7vh'])
  const ringRotate = useTransform(progress, [0, 1], [0, -260])
  const coreScale = useTransform(progress, [0, 0.5, 1], [1, 0.72, 1.15])
  const imageOpacity = useTransform(progress, [0.18, 0.36, 0.82, 1], [0, 1, 1, 0.25])

  return (
    <motion.div
      className={`artifact artifact--${mode}`}
      style={{ rotateY, rotateX, scale, y }}
      aria-hidden="true"
    >
      <motion.div className="artifact__halo artifact__halo--outer" style={{ rotate: ringRotate }} />
      <motion.div className="artifact__halo artifact__halo--inner" style={{ rotate: ringRotate }} />
      <motion.div className="artifact__core" style={{ scale: coreScale }}>
        {image ? (
          <motion.img src={image} alt="" draggable="false" style={{ opacity: imageOpacity }} />
        ) : (
          <span>{label}</span>
        )}
        <i className="artifact__scan" />
      </motion.div>
      {shardData.map(([x, yPos, rotate, scaleValue], index) => (
        <motion.i
          className="artifact__shard"
          key={`${x}-${yPos}`}
          style={{
            left: `calc(50% + ${x})`,
            top: `calc(50% + ${yPos})`,
            rotate: rotate + index * 7,
            scale: scaleValue,
            z: 40 + index * 14
          }}
          animate={{
            y: [0, index % 2 ? 10 : -8, 0],
            rotateZ: [rotate, rotate + (index % 2 ? 8 : -8), rotate]
          }}
          transition={{
            duration: 5.5 + index * 0.36,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      <div className="artifact__axis artifact__axis--x" />
      <div className="artifact__axis artifact__axis--y" />
      <div className="artifact__micro artifact__micro--a">OBJ / {mode.toUpperCase()}</div>
      <div className="artifact__micro artifact__micro--b">ROT / 06.24°</div>
    </motion.div>
  )
}
