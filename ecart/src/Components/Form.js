function Form() {
  const btnclick = (id) => {
    console.log("button is click" + id);
  };

  const btnchange = (id) => {
    console.log("change click" + id);
  };

  const oninput = (id) => {
    console.log("text is input" + id);
  };
  return (
    <div class="col-6">
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value="email"
          onInput={(event) => oninput(66, event)}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={(event) => btnchange(11, event)}
        ></textarea>

        <input
          class="btn btn-primary"
          type="submit"
          value="Submit"
          id="submit"
          onClick={(event) => btnclick(108, event)}
        ></input>
      </div>
    </div>
  );
}

export default Form;
