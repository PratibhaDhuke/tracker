import { useState } from "react";
import "./css/style.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [fname, setname] = useState("abc");
  const [gender, setGender] = useState("female");
  const [hobbies, sethobbies] = useState("reading");

  const save = () => {
    let data = {
      email: email,
      fname: fname,
      gender: gender,
      hobbies: hobbies,
    };
    console.log(data);
  };

  return (
    <div class="col-6 crdgroup">
      <div className="mb-3">
        email:
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <br />
        First name
        <input
          type="text"
          value={fname}
          onChange={(event) => setname(event.target.value)}
        />
        <br />
        <br />
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={(event) => setGender(event.target.value)}
          checked={gender === "male"}
        />
        Male
        <br />
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={(event) => setGender(event.target.value)}
          checked={gender === "female"}
        />
        Female
        <br />
        <br />
        Hobbies
        <select
          name="hobbies"
          onChange={(event) => sethobbies(event.target.value)}
        >
          <option value="reading" selected>
            Reading
          </option>
          <option value="cooking">Cooking</option>
          <option value="dancing">Dancing</option>
        </select>
        <br />
        <br />
        <input
          type="submit"
          value="save"
          onClick={(event) => save(event)}
        ></input>
      </div>
    </div>
  );
}

export default Contact;
