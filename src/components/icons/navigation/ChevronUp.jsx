import IconBase from '../IconBase'

export default function ChevronUp({ size = 16, ...props }) {
  return (
    <IconBase size={size} {...props}>
      <path d='m18 15-6-6-6 6' />
    </IconBase>
  )
}
