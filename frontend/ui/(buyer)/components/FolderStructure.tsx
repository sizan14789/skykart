import Link from "next/link";

export function FolderStructure({
  list,
  text_size,
  margin,
}: {
  list: { text: string; url: string }[];
  text_size?: string;
  margin?: string;
}) {
  return (
    <p
      className={`${
        text_size ? text_size : "text-sm"
      } text-(--subtext) flex items-center gap-1 ${margin ? margin : ""}`}
    >
      <Link href="/">Home</Link> <span>/</span>
      {list.map(({ text, url }, index) => (
        <Link href={"/" + url} key={index}>
          {text} {index !== list.length - 1 ? <span>/</span> : <></>}
        </Link>
      ))}
    </p>
  );
}
