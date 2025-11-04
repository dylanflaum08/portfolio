'use client'

type Pos = 'left' | 'right' | 'both'
type Align = 'edge' | 'content' 

export default function SideDecor({
  position = 'left',
  align = 'edge',
}: { position?: Pos; align?: Align }) {
  const rootCls = `side-art side-art--${align}`
  return (
    <div aria-hidden className={rootCls}>
      {(position === 'left'  || position === 'both') && <div className="side-art__ribbon side-art__ribbon--left" />}
      {(position === 'right' || position === 'both') && <div className="side-art__ribbon side-art__ribbon--right" />}
      {(position === 'left'  || position === 'both') && <div className="side-art__glow side-art__glow--left" />}
      {(position === 'right' || position === 'both') && <div className="side-art__glow side-art__glow--right" />}
      <div className="side-art__grid" />
    </div>
  )
}
