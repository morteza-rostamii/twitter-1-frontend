import { faker } from "@faker-js/faker"

const EmojiPicker = ({
  activeEmoji,
  setActiveEmoji,
}:any) => {
  return (
    <ul
    className="
    flex items-center gap-2 flex-wrap
    "
    >
      {
        emojis?.length
        ?(
          emojis.map((el:any) => (
            <button
            type="button"
            className="
            grid place-content-center
            text-3xl bg-red-50 rounded-full p-1 w-8 h-8
            hover:scale-110 transition-all
            focus:outline outline-sky-500
            "
            key={el.id}
            onClick={() => setActiveEmoji(el.icon)}
            >
              {el.icon}
            </button>
          ))
        ):''
      }
    </ul>
  )
}

const emojis = [
  {
    id: faker.string.uuid(),
    name: 'grinning-face',
    icon: '😀',
  },
  {
    id: faker.string.uuid(),
    name: 'grinning-face-with-smiling-eyes',
    icon: '😄',
  },
  {
    id: faker.string.uuid(),
    name: 'beaming-face-with-smiling-eyes',
    icon: '😁',
  },
  {
    id: faker.string.uuid(),
    name: 'face-with-tears-of-joy',
    icon: '😂',
  },
  {
    id: faker.string.uuid(),
    name: 'winking-face',
    icon: '😉',
  },
  {
    id: faker.string.uuid(),
    name: 'face-blowing-a-kiss',
    icon: '😘',
  },
  {
    id: faker.string.uuid(),
    name: 'star-struck',
    icon: '🤩',
  },
  // {
  //   id: faker.string.uuid(),
  //   name: 'face-with-tongue',
  //   icon: '😛',
  // },
  // {
  //   id: faker.string.uuid(),
  //   name: 'money-mouth-face',
  //   icon: '🤑',
  // },
  // {
  //   id: faker.string.uuid(),
  //   name: 'smirking-face',
  //   icon: '😏',
  // },
]

export default EmojiPicker