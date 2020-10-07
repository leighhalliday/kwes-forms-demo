import { useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const formRef = useRef();

  useEffect(() => {
    let kwesScript = document.querySelector("#kwes-script");

    if (!kwesScript) {
      kwesScript = document.createElement("script");
      kwesScript.setAttribute("id", "kwes-script");
      kwesScript.setAttribute("src", "https://kwes.io/v2/kwes-script.js");
      document.head.appendChild(kwesScript);
    }
  }, []);

  useEffect(() => {
    formRef.current.addEventListener("kwCustomRulesSet", () => {
      window.setCustomKwRule(
        "mentoring",
        "even",
        "Even numbers only",
        (value) => {
          const parsed = parseInt(value, 10);
          if (isNaN(parsed)) return true;
          return parsed % 2 === 1;
        }
      );

      window.setCustomKwRule(
        "mentoring",
        "date",
        "Future dates only",
        (value) => {
          if (!value) return true;
          console.log(new Date(value));
          return new Date(value) < new Date();
        }
      );
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kwes</title>
      </Head>

      <form
        id="mentoring"
        method="POST"
        className="kwes-form"
        action="https://kwes.io/api/foreign/forms/RmgBFwkvf8HQ6Fs17It0"
        ref={formRef}
      >
        <div>
          <label htmlFor="name">Your name</label>
          <input type="text" name="name" data-kw-rules="required|max:255" />
        </div>

        <div>
          <label htmlFor="even">Even number</label>
          <input type="text" name="even" data-kw-rules="required" />
          <p>
            <span data-kw-answer-piped>fields.even</span> is a great number
          </p>
          <div data-kw-show="fields.even === '42'">
            Answer to the Ultimate Question of Life, the Universe, and
            Everything
          </div>
        </div>

        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" name="email" data-kw-rules="required" />
        </div>

        <div className="kw-datepicker-wrapper">
          <label htmlFor="date">When</label>
          <input type="datepicker" name="date" data-kw-rules="required" />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
