import IconBase from '../IconBase'

export default function ChevronDown({ size = 16, ...props }) {
  return (
    <IconBase size={size} {...props}>
      <path d='m6 9 6 6 6-6' />
    </IconBase>
  )
}
