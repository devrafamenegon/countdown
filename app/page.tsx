import CountdownTimer from '@/components/countdown';
import Head from 'next/head';

const Home = () => {
  const title = process.env.NEXT_PUBLIC_TITLE;
  const subtitle = process.env.NEXT_PUBLIC_SUBTITLE;
  const day = process.env.NEXT_PUBLIC_DAY;
  const month = process.env.NEXT_PUBLIC_MONTH;
  const year = process.env.NEXT_PUBLIC_YEAR;
  const hour = process.env.NEXT_PUBLIC_HOUR;
  const minute = process.env.NEXT_PUBLIC_MINUTE;

  const targetDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
  const formattedDate = `${day}/${month}/${year} às ${hour}:${minute}`;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <Head>
        <title>Contador Regressivo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="relative flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          {title}
        </h1>
        <h2 className="text-2xl md:text-4xl mb-10 text-white">
          {subtitle}
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold mb-10 text-white">
          {`Contagem Regressiva até ${day ? formattedDate : '<Data não informada>'}`}
        </h3>

        <div className="bg-white bg-opacity-80 p-2 rounded-lg shadow-lg">
          <CountdownTimer date={targetDate} />
        </div>
      </main>
    </div>
  );
};

export default Home;
