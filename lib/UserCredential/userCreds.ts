export const get_user_credentials_in_axios_header = () => {
  let user_cred: any = localStorage.getItem("persist:user");
  user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
  // console.log(user_cred["jwt_access_token"]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
  };
  // console.log(headers);

  return headers;
};
