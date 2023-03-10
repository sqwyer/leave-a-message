import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dev",
];

const Home: NextPage = () => {
  const [phrase, setPhrase] = useState("");
  const mutation = trpc.messages.findOne.useMutation();
  const [showHelp, setShowHelp] = useState(true);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const LoadMessage = () => {
    mutation.mutate(phrase);
    setShowHelp(false);
  };

  return (
    <>
      <Head>
        <title>Leave-a-message!</title>
        <meta name="description" content="Leave a secret message with a passphrase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen grid min-h-screen items-center justify-center bg-black">
        {mutation.status == "loading" ? (
          <div className="flex items-center justify-center">
            <div
              className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-800"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : mutation.data ? (
          <div className="m-20 flex flex-col gap-4 text-center font-semibold">
            <p
              className="cursor-pointer text-sm font-semibold text-neutral-500 underline duration-75 hover:text-neutral-400"
              onClick={() => {
                mutation.reset();
                setShowHelp(true);
              }}
            >
              Close
            </p>
            <p className="text-neutral-400">{mutation.data.message}</p>
            <p className="mx-auto flex flex-row gap-3 text-neutral-700">
              <span className="text-red-500">♥</span>{" "}
              <span>Left on {formatDate(mutation.data.createdAt)}</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="mx-auto w-52 text-center text-sm font-semibold text-neutral-700">
              {showHelp ? "(Press enter to submit)" : "No message found :'("}
            </p>
            <div className="relative">
              <input
                type="text"
                id="floating_outlined"
                className="peer block w-full appearance-none rounded-lg border-2 border-neutral-900 bg-transparent px-2.5 pb-2.5 pt-4 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={(e) => setPhrase(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") LoadMessage();
                }}
                autoComplete="off"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute top-2 left-1/4 z-10 origin-[0] -translate-y-4 scale-75 transform bg-black px-2 text-sm font-semibold text-neutral-800 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:left-[30%] peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500"
              >
                Passphrase
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <p
                className="cursor-pointer text-center text-sm font-semibold text-neutral-700 underline duration-75 hover:text-neutral-500"
                onClick={() => window.open("/send", "_self")}
              >
                Leave a message
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
