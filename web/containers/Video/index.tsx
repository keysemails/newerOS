'use client'

type Props = {
  url?: string
  width?: number
  height?: number
}

const Video = (props: Props) => {
  const { width = 720, height, url } = props

  return (
    <video
      style={{
        width: '80%',
        maxHeight: '80vh',
        height: 'auto',
        clipPath: 'inset(3px 3px)',
      }}
      width={width}
      height={height}
      autoPlay
      loop
      muted
    >
      <source src={url} type="video/mp4" />
    </video>
  )
}

export default Video
