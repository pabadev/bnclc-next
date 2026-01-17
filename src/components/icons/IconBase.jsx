// src/components/icons/IconBase.jsx
export default function IconBase({ size = 16, color = 'currentColor', strokeWidth = 2, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      {children}
    </svg>
  )
}
