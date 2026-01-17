import IconBase from '../IconBase'

export default function Clock({ size = 16, ...props }) {
  return (
    <IconBase size={size} {...props}>
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </IconBase>
  )
}
