import React from "react"

export default function Logo({ color }) {
  const fillColor = color || "white"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="88.370667" height="29.457333" viewBox="0 0 88.370665 29.457333">
      <defs>
        <clipPath id="a">
          <path d="M0 612h792.166V0H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 -814.03545 76.215865)">
        <path fill={fillColor} d="M675.8846 56.2699c.129 0 .243.012.243.164 0 .127-.125.142-.228.142h-.208v-.306zm-.193-.594h-.171v1.046h.397c.253 0 .381-.088.381-.301 0-.189-.116-.268-.273-.285l.294-.46h-.195l-.271.447h-.162zm.188 1.322c-.41 0-.728-.321-.728-.781 0-.43.277-.782.728-.782.404 0 .723.319.723.782 0 .46-.319.781-.723.781m0-1.727c-.544 0-.931.407-.931.946 0 .568.43.945.931.945.495 0 .925-.377.925-.945 0-.569-.43-.946-.925-.946m-.456-7.757l1.381 1.363v4.143l-4.142 4.142h-13.808l-4.143-4.142v2.761l-1.38 1.381h-5.524l-1.38-1.381v-2.761l-2.762-2.762-2.762 2.762v2.761l-1.38 1.381h-5.524l-1.38-1.381-1.381 1.381h-5.523l-1.381-1.381v-5.523l-6.904 6.904h-5.523l-1.381-1.381v-19.331l1.381-1.381h5.523l1.381 1.381v5.523l6.904-6.904h5.523l1.381 1.381v11.047l6.904-6.904v-4.143l1.38-1.381h5.524l1.38 1.381v4.143l6.904 6.904v-8.285l4.143-4.143h13.808l4.142 4.143v4.142l-1.381 1.383h-6.904v-1.383h-5.523v5.523h5.523v-1.363z" />
      </g>
    </svg>
  )
}

