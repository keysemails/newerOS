import React from 'react'

type Props = {
  name: string
  text: string
}

const ChoiceItem: React.FC<Props> = ({ name, text }) => {
  return (
    <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-8 rounded-xl text-center" style={{ backgroundColor: "#ededed" }}>
      <h3 className="text-2xl dark:text-black">{name}</h3>
      <p className="w-36 text-xs dark:text-black">{text}</p>
    </div>
  )
}

export default ChoiceItem
