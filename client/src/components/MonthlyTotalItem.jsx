import React from "react";
import { Divider, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDateStringFromKeyMonth } from "../services/dateConversionService";

const MonthlyTotalItem = ({ month }) => {
  const navigate = useNavigate();
  const remainingMoney = Number(month.budget - month.total);

  return (
    <>
      <ListItemButton
        onClick={() => {
          navigate(`/month/${month.keyMonth}`);
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
          <Typography variant='h6'>
            {getDateStringFromKeyMonth(month.keyMonth)}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant='button'>
              <strong style={{ color: remainingMoney > 0 ? "green" : "red" }}>
                {month.total ? Number(month?.total).toFixed(2) : 0}
              </strong>{" "}
              / {month?.budget || "-"} CAD
            </Typography>

            <Typography
              variant='overline'
              color={remainingMoney > 0 ? "green" : "red"}>
              <strong>
                {month.budget && month.total
                  ? " ( " + remainingMoney.toFixed(2) + " )"
                  : "( - )"}
              </strong>
            </Typography>
          </div>
        </div>
      </ListItemButton>
      <Divider />
    </>
  );
};

export default MonthlyTotalItem;
