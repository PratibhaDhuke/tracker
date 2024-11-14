import { useState, useEffect } from "react";

function Contacts() {
  const [input, setInputs] = useState("");
  const [counter, setcount] = useState(0);

  const handleChange = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    setInputs((values) => ({ ...input, [key]: value }));
  };
  const save = (id, event) => {
    if (event.target.value === "save") {
      console.log(input);
      setcount((counter) => counter + 1);
    }
  };

  useEffect(() => {
    console.log("change is done");
    console.log(counter);
  }, [counter]);

  return (
    <>
      <form>
        Name:{" "}
        <input
          name="name"
          onChange={(event) => handleChange(event)}
          value={input.name}
        />
        <br />
        Email:{" "}
        <input onChange={(event) => handleChange(event)} value={input.email} />
        <br />
        Gender: Male:{" "}
        <input
          type="radio"
          value="male"
          name="gender"
          checked={input.gender === "male"}
          onChange={(event) => handleChange(event)}
        />
        Female:{" "}
        <input
          type="radio"
          value="female"
          name="gender"
          checked={input.gender === "female"}
          onChange={(event) => handleChange(event)}
        />
        <br />
        <input
          type="button"
          value="save"
          onClick={(event) => save(10, event)}
        />
      </form>
    </>
  );
}

export default Contacts;
