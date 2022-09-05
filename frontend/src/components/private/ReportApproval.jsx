import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Popper,
  Paper,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

import MessageStrip from "../utils/MessageStrip";
import ApprovalTable from "../utils/ApprovalTable";

const reducer = (state, action) => {
  switch (action.type) {
    case "REPORTS_UPDATE":
      return {
        ...state,
        reports: action.reportsArray.map((report) => {
          return { ...report, isChanged: false };
        }),
      };
    case "REPORT_UPDATE":
      return {
        ...state,
        reports: [
          ...state.reports.map((report) => {
            return report.id === action.id
              ? { ...report, [action.property]: action.value, isChanged: true }
              : { ...report };
          }),
        ],
      };
    case "SHOW_MESSAGE":
      return {
        ...state,
        message: {
          isOpen: true,
          severity: action.severity,
          message: action.message,
        },
      };
    case "HIDE_MESSAGE":
      return {
        ...state,
        message: {
          isOpen: false,
          severity: "info",
          message: "",
        },
      };
    default:
      return state;
  }
};

const options = ["Submit", "Submit and Refresh"];

const ReportApproval = () => {
  const [{ reports, message }, dispatch] = useReducer(reducer, {
    reports: [],
    message: { isOpen: false, severity: "info", message: "" },
  });

  const handleApproveReport = (id) => {
    dispatch({ type: "REPORT_UPDATE", id: id, property: "status", value: 2 });
  };

  const handleRejectReport = (id) => {
    dispatch({ type: "REPORT_UPDATE", id: id, property: "status", value: 1 });
  };

  const handleGetReports = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:3000/api/report", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch({
          type: "REPORTS_UPDATE",
          reportsArray: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SHOW_MESSAGE",
          severity: "error",
          message: err.message,
        });
      });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await axios
      .patch(
        "http://localhost:3000/api/report",
        handleReportsToSubmit(reports),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        dispatch(
          result.data.success
            ? {
                type: "SHOW_MESSAGE",
                severity: "success",
                message: result.data.message,
              }
            : {}
        );
        if (result.data.success) {
          setTimeout(handleGetReports(), 500);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SHOW_MESSAGE",
          severity: "error",
          message: err.message,
        });
      });
  };

  const handleReportsToSubmit = (reports) => {
    return reports.reduce((reportsToSubmit, report) => {
      return report.isChanged
        ? [
            ...reportsToSubmit,
            { id: report.id, status: report.status, userId: report.userId },
          ]
        : [...reportsToSubmit];
    }, []);
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  return (
    <>
      <ApprovalTable
        reports={reports}
        handleApproveReport={handleApproveReport}
        handleRejectReport={handleRejectReport}
      />
      <Box align="center" paddingTop={"30px"}>
        {reports.length > 0 ? (
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        ) : (
          <Typography variant="h4">
            There are not reports pending approval. Please come back latter
          </Typography>
        )}
      </Box>
      <MessageStrip
        isOpen={message.isOpen}
        severity={message.severity}
        message={message.message}
        handleClose={() => dispatch({ type: "HIDE_MESSAGE" })}
      />
    </>
  );
};

export default ReportApproval;
