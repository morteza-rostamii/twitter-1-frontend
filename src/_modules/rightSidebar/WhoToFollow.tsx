import { faker } from "@faker-js/faker";
import ToFollowItem from "./ToFollowItem";

const WhoToFollow = () => {
  return (
    <div
    className="flex flex-col gap-3 bg-slate-50"
    >
      <h2
      className="
      text-lg font-bold p-2
      "
      >
        Who to follow
      </h2>

      <ul
      className="
      flex flex-col gap-2
      "
      >
        {
          users?.length
          ?(
            users.map((el:any) => (
              <ToFollowItem
              key={el.id}
              item={el}
              />
            ))
          ):''
        }
      </ul>
    </div>
  )
}

const users = Array.from({length: 3}).map(() => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    image: faker.image.avatar(),

  };
});

export default WhoToFollow