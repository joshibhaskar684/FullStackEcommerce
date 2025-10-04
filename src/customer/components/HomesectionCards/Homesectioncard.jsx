export default function Homesectioncard({ data }) {
  return (
    <div className="productcard w-[15rem] m-3 px-2 my-3 transition-all cursor-pointer shadow-sm hover:shadow-xl border ">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-top"
          alt={data.title}
          src={data.image}
        />
      </div>
      <div className="textpart bg-white p-3">
        <p className="font-bold opacity-60">{data.brand}</p>
        <p className="line-clamp-1">{data.title}</p>
      </div>
    </div>
  );
}
