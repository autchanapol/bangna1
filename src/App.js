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
//           <Dialog
//             fullWidth={fullWidth}
//             maxWidth={maxWidth}
//             open={open}
//             onClose={handleClose}
//           >
//             <DialogTitle>สั่งอาหารผู้ป่วยใน</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 สั่งอาหาร โดยผู้ใช้จะต้องเลือก ประเภทอาหาร ให้ครบทุกเตียง และกด SAVE
//               </DialogContentText>
//               <FormControl sx={{ mt: 2, minWidth: 120 }}></FormControl>
//               <FormGroup>
//                 <Label for="name">เลือก Ward</Label>
//                 <Select
//                   defaultValue={wardOptions[0]} // เลือกค่าเริ่มต้นเป็น Ward 1
//                   options={wardOptions} // ใช้ตัวเลือก Wards อย่างเดียว
//                 />

//                 <Button style={{ marginTop: "10px" }} color="secondary">
//                   แสดงข้อมูล
//                 </Button>
//               </FormGroup>

//               <Row>
//                 <Card>
//                   <CardBody>
//                     <div className="table-container">
//                       <Table bordered>
//                         <thead>
//                           <tr>
//                             <th>No.</th>
//                             <th>เลขห้อง</th>
//                             <th>ประเภทอาหาร</th>
//                             <th>หมายเหตุ</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentPageData.map((bed) => (
//                             <tr key={bed.id}>
//                               <th scope="row">{bed.id}</th>
//                               <td>{bed.name}</td>
//                               <td>
//                                 <Select
//                                   options={foodOption} // ใช้ตัวเลือก Wards หรือปรับแต่งตามต้องการ
//                                   defaultValue={foodOption[0]} // ค่าเริ่มต้น
//                                   onChange={(selected) => console.log(selected)} // ฟังก์ชันเมื่อเลือก
//                                 />
//                               </td>
//                               <td>
//                                 <Input
//                                   type="text"
//                                   placeholder="กรอกข้อมูล..."
//                                   onChange={(e) => console.log(e.target.value)} // ฟังก์ชันเมื่อกรอกข้อมูล
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Row>

//               {/* </Box> */}
//             </DialogContent>
//             <DialogActions>
//               <Button color="primary" onClick={handleSave}>SAVE</Button>
//               <Row></Row>
//               <Button color="danger" onClick={handleClose}>Close</Button>
//             </DialogActions>
//           </Dialog>
//         </React.Fragment>
//   );
// }
