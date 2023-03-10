import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const mutation = trpc.messages.createNew.useMutation();

  function send() {
    if (passphrase.trim() != "" && message.trim() != "") {
      mutation.mutate({
        phrase: passphrase,
        message,
      });
    }
  }

  if (mutation.status == "error") console.log(mutation.error.message);
  if (mutation.status == "success") window.open("/", "_self");

  return (
    <>
      <Head>
        <title>Leave-a-message!</title>
        <meta name="description" content="Leave a secret message with a passphrase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen grid min-h-screen items-center justify-center bg-black">
        <div className="m-6 flex w-full flex-col gap-2 lg:w-72">
          <p
            className="mb-4 cursor-pointer text-sm font-semibold text-neutral-500 underline duration-75 hover:text-neutral-400"
            onClick={() => window.open("/", "_self")}
          >
            Back
          </p>
          {mutation.status == "error" && (
            <p className="mb-4 text-sm font-semibold text-neutral-600">
              An error occured, maybe try a new passphrase :&apos;(
            </p>
          )}

          <div className="relative">
            <textarea
              id="message"
              className="peer block h-36 w-full resize-none appearance-none  rounded-lg border-2 border-neutral-900  bg-transparent px-2.5 pb-2.5 pt-4 text-sm font-semibold  text-white focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder=" "
              onChange={(e) => setMessage(e.target.value)}
            />
            <label
              htmlFor="message"
              className="absolute top-2 left-2  z-10 origin-[0] -translate-y-4 scale-75 transform bg-black px-2 text-sm font-semibold text-neutral-800 duration-300  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-14 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500"
            >
              Your Message
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="passphrase"
              className="peer block w-full appearance-none rounded-lg border-2 border-neutral-900 bg-transparent px-2.5 pb-2.5 pt-4 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder=" "
              onChange={(e) => setPassphrase(e.target.value)}
            />
            <label
              htmlFor="passphrase"
              className="absolute top-2 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-black px-2 text-sm font-semibold text-neutral-800 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500"
            >
              Passphrase
            </label>
          </div>
          <div
            className={`rounded-md bg-neutral-900 p-2 text-center font-semibold text-white duration-75 ${
              passphrase.trim() != "" && message.trim() != ""
                ? "cursor-pointer opacity-70 hover:opacity-80"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => send()}
          >
            Send
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
