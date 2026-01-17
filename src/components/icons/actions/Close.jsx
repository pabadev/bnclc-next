import IconBase from '../IconBase'

export default function Close({ size = 16, ...props }) {
  return (
    <IconBase size={size} {...props}>
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </IconBase>
  )
}
