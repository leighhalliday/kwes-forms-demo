import { useEffect } from "react";
import kwesforms from "kwesforms";

export default function Home() {
  useEffect(() => {
    kwesforms.init();

    kwesforms.setCustomRule(
      "mentoringForm",
      "date",
      "Please, not on the weekend",
      (value) => {
        const date = new Date(value);
        return date.getDay() === 0 || date.getDay() === 6;
      }
    );
  }, []);

  return (
    <main>
      <h1>Mentoring</h1>
      <form
        id="mentoringForm"
        className="kwes-form"
        action="https://kwes.io/api/foreign/forms/mvwTpXMko5wBaI08txJd"
      >
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            data-kw-rules="required|min:2|max:255"
          />
        </div>

        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" data-kw-rules="required|email" />
        </div>

        <div>
          <label htmlFor="fav">Your Favorite Number</label>
          <input type="number" name="fav" data-kw-rules="required" />
          <div data-kw-hide="fields.fav === ''">
            Your fav number is <span data-kw-answer-piped>fields.fav</span>.
          </div>
        </div>

        <div className="kw-datepicker-wrapper">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            data-kw-type="datepicker"
            data-kw-rules="required"
            autoComplete="off"
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
