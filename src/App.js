import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้าแรก
    const username = localStorage.getItem("username");
    if (username) {
      setIsAuthenticated(true);  // ถ้ามีข้อมูลผู้ใช้ ให้ตั้งค่าว่าล็อกอินแล้ว
    } else {
      setIsAuthenticated(false);  // ถ้าไม่มีข้อมูลผู้ใช้ ให้ถือว่ายังไม่ได้ล็อกอิน
    }
  }, []);  // useEffect นี้จะทำงานครั้งเดียวเมื่อโหลดแอปครั้งแรก

  const routing = useRoutes(ThemeRoutes(isAuthenticated, setIsAuthenticated));

  return <div>{routing}</div>;
};

export default App;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Switch from "@mui/material/Switch";

// export default function MaxWidthDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [maxWidth, setMaxWidth] = React.useState("lg");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMaxWidthChange = (event) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value
//     );
//   };

//   const handleFullWidthChange = (event) => {
//     setFullWidth(event.target.checked);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open max-width dialog
//       </Button>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={open}
//         onClose={handleClose}
//       >
//         <DialogTitle>Optional sizes</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             You can set my maximum width and whether to adapt or not.
//           </DialogContentText>
//           <Box
//             noValidate
//             component="form"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               m: "auto",
//               width: "fit-content",
//             }}
//           >
//             <FormControl sx={{ mt: 2, minWidth: 120 }}></FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
