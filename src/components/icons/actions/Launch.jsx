import IconBase from '../IconBase'

export default function Launch({ size = 16, className = '', ...props }) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <path d='M9 15l6-6' />
      <path d='M11 9h4v4' />
    </IconBase>
  )
}
