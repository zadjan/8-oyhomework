import Posts from "./posts";

export default async function Page({ searchParams }) {
  const params = await searchParams;  
  const style = params?.style || "comedy";

  return <Posts initialStyle={style} />;
}
