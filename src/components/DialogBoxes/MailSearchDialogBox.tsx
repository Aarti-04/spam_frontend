// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// import { MailSearchForm } from "../MailSearch/MailSearchForm";
// export default function MailSearchDialogBox({ open, setOpen }: any) {
//   //   const [open, setOpen] = React.useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: "form",
//           onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries((formData as any).entries());
//             console.log(formJson);

//             const email = formJson.email;
//             console.log(email);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>Subscribe</DialogTitle>
//         <DialogContent>
//           {/* <MailSearchForm open={open} setOpen={setOpen}></MailSearchForm> */}
//           <form className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="email"
//                 name="sender"
//                 id="floating_email"
//                 className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="floating_email"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 From
//               </label>
//             </div>
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="email"
//                 name="recipient"
//                 id="floating_email"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="floating_password"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 To
//               </label>
//             </div>
//             <div className="grid md:grid-cols-2 md:gap-6">
//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   type="text"
//                   name="header"
//                   id="floating_first_name"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="floating_first_name"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Subject
//                 </label>
//               </div>
//             </div>
//             <div className="grid md:grid-cols-2 md:gap-6">
//               <div className="relative z-0 w-full mb-5 group">
//                 <label
//                   htmlFor="countries"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Search
//                 </label>
//                 <select
//                   id="searchIn"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   name="searchIn"
//                 >
//                   <option>All Mail</option>
//                   <option>Inbox</option>
//                   <option>Sent Mail</option>
//                   <option>Starred</option>
//                 </select>
//               </div>
//             </div>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button>Cancel</Button>
//           <Button type="submit">Search</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { Theme, useTheme } from "@mui/material/styles";
import { theme } from "@/app/theme/theme";
import { useAppDispatch } from "@/app/redux/STORE/store";
import { FilterMessages } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MailSearchDialogBox({ open, setOpen }: any) {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = React.useState({
    query_type: "All Mail",
    from: "",
    header: "",
    recipient: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={setOpen}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());
            console.log(formValues);
            const search = formValues.from || formValues.recipient;

            const query_type = formValues.query_type;
            console.log("search", search);
            console.log("query_type", query_type);
            const res = await dispatch(FilterMessages({ search, query_type }));
            console.log(res);

            // setOpen();
          },
        }}
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="From"
            name="from"
            label="From"
            // type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formValues.from}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="recipient"
            label="To"
            type="email"
            fullWidth
            variant="standard"
            value={formValues.recipient}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="header"
            label="header"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.header}
            onChange={handleChange}
          />
          <InputLabel id="demo-multiple-name-label">Search</InputLabel>
          <Select
            autoFocus
            margin="dense"
            id="name"
            name="query_type"
            label="Search"
            type="email"
            fullWidth
            variant="standard"
            input={<OutlinedInput label="Search" />}
            MenuProps={MenuProps}
            value={formValues.query_type}
            onChange={handleChange}
          >
            {["All Mail", "Inbox", "Sent"].map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={setOpen}>Cancel</Button>
          <Button type="submit">Search</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
