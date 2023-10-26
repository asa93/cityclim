import styles from "./layout.module.css";

import Link from "next/link";

import Drawer from "@mui/material/Drawer";

import React, { useState } from "react";

import BuildIcon from "@mui/icons-material/Build";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SideBar({ children, home, title }) {
  return (
    <Drawer variant="persistent" anchor={"left"} open={true}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AcUnitIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="CityClim" />
          </ListItemButton>
        </ListItem>

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

        <ListItem disablePadding>
          <Link href={`/accounts`}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href={`/places`}>
            <ListItemButton>
              <ListItemIcon>
                <SensorDoorIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Locaux" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href={`/connexion`}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}
