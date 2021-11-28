import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";

import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  makeStyles
} from "@material-ui/core";

import { useAuthState } from "../../../context/AuthContext";
import { getUser } from "../../../actions/authActions";



const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const UserDetails= ({ className, setCounter, ...rest }) => {

  const [isLoading, setIsLoading] = useState(false);
  
  const { userType, userID, token } = useAuthState();
  const [detailList, setDetailList] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    if (userType === "student") {
   
      getUser({ id: userID, token, userType }).then((fetchedStudents) => {
        console.log(fetchedStudents);
        const details = [
          fetchedStudents.data["name"],
          fetchedStudents.data["studentID"],
          fetchedStudents.data["email"],
          fetchedStudents.data["department"],
          fetchedStudents.data["degree"],
          fetchedStudents.data["year"],
          fetchedStudents.data["coins"],
        ];
        console.log(details);
        setDetailList(fetchedStudents.data);
        setLoading(false);
      });
    } else {
      getUser({ id: userID, token, userType }).then((fetchedFaculty) => {
        const details = [
          fetchedFaculty.data["name"],
          fetchedFaculty.data["facultyID"],
          fetchedFaculty.data["email"],
          fetchedFaculty.data["department"],
          fetchedFaculty.data["position"],
          fetchedFaculty.data["description"]
        ];
        setDetailList(details);
        setLoading(false);
      });
    }
  }, [token, userID, userType]);

 

  return isLoading ? (
    <Spinner />
  ) : (
  <>
    
      <Divider />
      
        <Box>
       
        <TableContainer component={Box} style={{marginTop:'20px'}}>
        <Table>
         
          <TableBody>
        
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Name"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.name}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"ID"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.studentID}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Email"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.email}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Coin Balance"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.coins}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Degree"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.degree}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Branch"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.branch}
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
   </> 
  
  );
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails
