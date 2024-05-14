import axios from "axios";

export const userloginapi = async (data: any) =>
  await axios.post("http://127.0.0.1:8000/api/googlelogin/", {
    email: data.email,
    password: data.password,
  });
export const ArchivedMail = async (message_id: string) => {
  const res = await axios.patch(
    `http://127.0.0.1:8000/api/mailarchived/?message_id=${message_id}`
  );
  console.log(res.data);
  return res.data;
};
