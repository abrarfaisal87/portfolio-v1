import React, { useRef, useState } from "react";

const Contact = () => {
  const formInitialDetails = {
    name: "",
    email: "",
    message: "",
  };

  const contactRef = useRef(null);
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = () => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <section id="contact" rel={contactRef} className="py-16">
      <div className="mx-auto max-w-fit px-4">
        <h1 className="text-3xl lg:text-4xl mb-8 text-center font-medium">
          Contact me
        </h1>
        {/* --- */}
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 ">
              <p>Name</p>
              <input
                type="text"
                value={formDetails.nameame}
                placeholder="Your Name"
                onChange={(e) => onFormUpdate("name", e.target.value)}
                className="p-2 rounded-md w-96 text-black bg-slate-200 outline-none"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <p>Email</p>
              <input
                type="text"
                value={formDetails.email}
                placeholder="Your email"
                onChange={(e) => onFormUpdate("email", e.target.value)}
                className="p-2 rounded-md w-96 text-black bg-slate-200 outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p>Message</p>
              <textarea
                placeholder="Message"
                value={formDetails.message}
                className="text-black h-24 w-96 rounded-md p-2 bg-slate-200 outline-none"
                onChange={(e) => onFormUpdate("message", e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="border border-gray-300 w-14 h-10 rounded-md
               hover:text-black hover:bg-white transition-all"
              >
                {buttonText}
              </button>
              {status.message && (
                <col>
                  <p
                    className={
                      status.success === false
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {status.message}
                  </p>
                </col>
              )}
            </div>
          </div>
        </form>

        {/* --- */}
      </div>
    </section>
  );
};

export default Contact;
