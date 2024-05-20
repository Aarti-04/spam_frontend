import axios from "axios";

export const get_auth_user_credentials = () => {
  let user_cred: any = localStorage.getItem("persist:user");
  user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
  console.log(user_cred["jwt_access_token"]);
};

export const userloginapi = async (data: any) =>
  await axios.post("http://127.0.0.1:8000/api/googlelogin/", {
    email: data.email,
    password: data.password,
  });
export const ArchivedMail = async (message_id: string) => {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/mailarchived/?message_id=${message_id}`
    );
    console.log(res.data);
    console.log("archived....");

    return res.data;
  } catch (error: any) {
    console.log(error.message);

    console.log(error.response.status);
  }
};
