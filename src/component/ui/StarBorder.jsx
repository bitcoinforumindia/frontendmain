import { cn } from "../../lib/utils"

export function StarBorder({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}) {
  const Component = as || "div"
  const defaultColor = color || "#FF9900"

  return (
    <Component
      className={cn(
        "relative inline-block",
        className
      )}
      style={{
        filter: 'drop-shadow(0 0 8px rgba(255, 191, 0, 0.3))',
        overflow: 'visible',
        padding: '8px',
      }}
      {...props}
    >
      <div
        className="absolute w-[50%] h-[140%] bottom-[-20%] right-[-10%] animate-star-movement-bottom pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at center, ${defaultColor} 0%, transparent 60%)`,
          filter: 'blur(18px)',
        }}
      />
      <div
        className="absolute w-[50%] h-[140%] top-[-20%] left-[-10%] animate-star-movement-top pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 50% at center, ${defaultColor} 0%, transparent 60%)`,
          filter: 'blur(18px)',
        }}
      />
      <div className="relative">
        {children}
      </div>
    </Component>
  )
}



