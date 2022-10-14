// credits: Lee Robinson
import React, { useRef, useState } from "react";
import Confetti from "react-dom-confetti";

const config = {
  startVelocity: 22,
  spread: 135,
  // stagger: 5,
  elementCount: 80,
};

export enum FORMTYPE {
  AfterArticle,
  Generic,
  Slim,
}

function SuccessMessage(Props: { children: any }) {
  return (
    <p className="flex items-center text-sm font-bold text-emerald-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {Props.children}
    </p>
  );
}

function ErrorMessage(Props: { children: any }) {
  return (
    <p className="flex items-center text-sm font-bold text-red-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {Props.children}
    </p>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Submitting</span>
    </div>
  );
}

// AfterArticle, Generic (default:Generic)
export function SubscribeForm(Props: { type: FORMTYPE }): JSX.Element {
  return <></>;
  const { type } = Props;
  const text = {
    [FORMTYPE.AfterArticle]: {
      title: "Enjoyed reading?",
      desc: "Get latest articles in your inbox. I write about tech, startups, and my past learnings.",
    },

    [FORMTYPE.Generic]: {
      title: "Gourav's Newsletter",
      desc: "I write about tech, startups, and my past learnings. Get latest articles in your inbox.",
    },
    [FORMTYPE.Slim]: {
      title: "Gourav's Newsletter",
      desc: "",
    },
  };

  const [form, setForm] = useState({ state: "", message: "" });
  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: "loading", message: "" });

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: (inputEl.current as unknown as any).value,
        referrer_url: `${window.location.href}`,
        referrer: document.referrer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: "error",
        message: error,
      });
      return;
    }

    (inputEl.current as unknown as any).value = "";
    setForm({
      state: "success",
      message: `Done! You're now subscribed.`,
    });
  };

  function handleInputChange(e: any) {
    return form.state !== "" ? setForm({ state: "", message: "" }) : "";
  }

  return (
    // `inline-block` to avoid margin-collapse
    <div className="border border-yellow-500 rounded p-6 mt-8 mb-4 w-full inline-block bg-yellow-50">
      <h5 className="text-lg md:text-xl font-bold">{text[type].title}</h5>
      <p className="my-1">{text[type].desc}</p>
      <div className="mx-auto z-50 absolute left-1/2">
        <Confetti active={form.state === "success"} config={config} />
      </div>
      <form
        className="flex items-center mb-4 relative mt-5"
        onSubmit={() => subscribe}
      >
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          tabIndex={0}
          id="email"
          placeholder="Your email address..."
          autoComplete="email"
          name="email"
          type="email"
          onChange={handleInputChange}
          title="Subscribe to Gourav's newsletter"
          required
          disabled={form.state === "loading"}
          className={`bg-white border-gray-300 focus:ring-1 focus:ring-yellow-400 outline-none px-4 py-1 rounded-l-md w-full ${
            form.state === "loading" && "cursor-not-allowed hover:opacity-70"
          }`}
        />
        <button
          tabIndex={0}
          className={`bg-gray-800 focus:ring-1 focus:ring-yellow-400 outline-none px-4 py-1 rounded-r-md text-white ${
            form.state === "loading" && "cursor-not-allowed hover:opacity-70"
          }`}
          type="submit"
          disabled={form.state === "loading"}
        >
          {form.state === "loading" ? <LoadingSpinner /> : "Subscribe"}
        </button>
      </form>
      {form.state === "error" && <ErrorMessage>{form.message}</ErrorMessage>}

      {form.state === "success" && (
        <SuccessMessage>{form.message}</SuccessMessage>
      )}
    </div>
  );
}
