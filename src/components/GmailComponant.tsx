import { useEffect, useState } from "react";

const GmailComponent: React.FC = () => {
  const [emails, setEmails] = useState([
    { check: false, star: false },
    { check: false, star: false },
    { check: false, star: false },
    { check: false, star: false },
    { check: false, star: false },
  ]);
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState<string>("/gmail");
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    updateTheme();
    ui();
    document
      .querySelector(".container")
      ?.setAttribute("style", "display: block;");
  }, []);

  const updateTheme = () => {
    if (theme === "is-gmail-light") {
      setTheme("is-gmail-dark");
    } else {
      setTheme("is-gmail-light");
    }

    document.body.className = theme;
  };

  const checkAll = () => {
    const updatedEmails = emails.map((email) => ({ ...email, check }));
    setEmails(updatedEmails);
  };

  const checkEmail = (emailIndex: number) => {
    const updatedEmails = [...emails];
    updatedEmails[emailIndex].check = !updatedEmails[emailIndex].check;
    setEmails(updatedEmails);
  };

  const starEmail = (emailIndex: number) => {
    const updatedEmails = [...emails];
    updatedEmails[emailIndex].star = !updatedEmails[emailIndex].star;
    setEmails(updatedEmails);
  };

  const redirect = (newUrl: string) => {
    window.scrollTo(0, 0);
    setUrl(newUrl);
  };

  const ui = () => {
    // Implement your ui function here
  };

  return (
    <div className="container max" id="app">
      {/* Your HTML content goes here */}
    </div>
  );
};

export default GmailComponent;
