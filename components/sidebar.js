import Link from "next/link";

import Drawer from "@mui/material/Drawer";

import React from "react";

import BuildIcon from "@mui/icons-material/Build";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BookIcon from "@mui/icons-material/Book";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { userState } from "../context/user";
import { useHookstate } from "@hookstate/core";
import { ROLES } from "../consts";

export default function SideBar() {
  const userState_ = useHookstate(userState);
  const { loggedIn, role } = userState_.get();
  if (!loggedIn) return null;

  return (
    <Drawer
      className="Sidebar"
      variant="persistent"
      anchor={"left"}
      open={true}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AcUnitIcon
                sx={{ backgroundColor: "#2BC48A" }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText sx={{ color: "#2BC48A" }} primary="CityClim" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <Link href={`/`}>
            <ListItemButton>
              <ListItemIcon>
                <BuildIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Maintenance" />
            </ListItemButton>
          </Link>
        </ListItem>
        {role === ROLES.ADMIN && (
          <ListItem disablePadding>
            <Link href={`/`}>
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Devis" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}

        {(role == ROLES.ADMIN || role === ROLES.TECHNICIEN) && [
          <ListItem disablePadding key={1}>
            <Link href={`/accounts`}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItemButton>
            </Link>
          </ListItem>,
          <ListItem disablePadding key={2}>
            <Link href={`/places`}>
              <ListItemButton>
                <ListItemIcon>
                  <SensorDoorIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Locaux" />
              </ListItemButton>
            </Link>
          </ListItem>,
          <ListItem disablePadding key={3}>
            <Link href={`/units`}>
              <ListItemButton>
                <ListItemIcon>
                  <DeviceThermostatIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Machines" />
              </ListItemButton>
            </Link>
          </ListItem>,
          <ListItem disablePadding key={4}>
            <Link href={`/references`}>
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Références" />
              </ListItemButton>
            </Link>
          </ListItem>,
        ]}
        <ListItem disablePadding>
          <Link href={`/`}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={role} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}
