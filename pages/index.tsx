import { GetServerSideProps } from "next";
import Head from "next/head";
import WeatherCard from "../components/WeatherCard";

export default function Home({ data }: any) {
  return (
    <>
      <Head>
        <title>Weather Card App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WeatherCard {...data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=360'
  )
  const res = await fetch(`http://localhost:3000/api/weather`, {
    method: "GET",
  });
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};
