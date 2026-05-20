"use client";

import React, { useMemo, useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { Delete, MoreVert, Search } from "@mui/icons-material";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const [users, setUsers] = useState([]);

  // MENU STATE
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/get_all_users");
      const data = await res.json();
      setUsers(data.users || data);
    } catch (err) {
      setUsers([]);
    }
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================
  const filteredUsers = useMemo(() => {
    let data = [...users];

    data = data.filter((user) =>
      (user?.name ?? "").toLowerCase().includes(search.toLowerCase()),
    );

    if (roleFilter !== "All") {
      data = data.filter((user) => user.role === roleFilter);
    }

    data.sort((a, b) => {
      const nameA = (a?.name ?? "").toLowerCase();
      const nameB = (b?.name ?? "").toLowerCase();

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    return data;
  }, [users, search, roleFilter, sortOrder]);

  
  const columns = [
    {
      field: "profile",
      headerName: "User",
      flex: 1.5,
      minWidth: 250,

      renderCell: (params) => (
        <Stack direction="row" spacing={2} alignItems="center" height="100%">
          <Avatar>{params.row.name?.[0]}</Avatar>

          <Box>
            <Typography fontSize={14} fontWeight={600}>
              {params.row.name}
            </Typography>

            <Typography fontSize={12} color="text.secondary">
              {params.row.email}
            </Typography>

          </Box>
        </Stack>
      ),
    },
 {  
     field: "Name", 
      headerName: "Name", 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => (
  <Typography
    sx={{
      borderRadius: "8px",
      fontWeight: 500,
    }}
  >
    {params.row.username}
  </Typography>
)
    },

    { 
      field: "Phone No", 
      headerName:"Phone No",
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => (
      <p>
      {params.row.Phone || '03001556660' }
    </p>

      ),
    },

  
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 140,
    renderCell: (params) => {
 
   const role = params.value === 1;

  return (
    <Chip
      label={role ? 1 : 2 }
      size="small"
      sx={{
        borderRadius: "8px",
        fontWeight: 500,
        backgroundColor: role ? "#C8F7C5" : "#F8C8C8",
        color: role ? "#1B5E20" : "#B71C1C",
      }}
    />
  );
}
    
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        const active = params.value === "Active" ;

        return (
          <Chip
            label={params.value || 'InActive' }
            size="small"
            sx={{
              borderRadius: "999px",
              fontWeight: 600,
              px: 1,
              color: active ? "#166534" : "#991b1b",
              backgroundColor: active ? "#dcfce7" : "#fee2e2",
            }}
          />
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: () => (
        <IconButton color="error">
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        width: "95%",
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        ml: 1,
      }}
    >
      {/* =========================
          HEADER (TITLE + MENU)
      ========================= */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Users Management
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage all system users
          </Typography>
        </Box>

        {/* 3 DOT MENU */}
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {/* SEARCH */}
          <Box sx={{ px: 2, py: 1, width: 250 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />
          </Box>

          {/* ROLE FILTER */}
          <MenuItem disableRipple>
            <Select
              size="small"
              fullWidth
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="All">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </MenuItem>

          {/* SORT */}
          <MenuItem disableRipple>
            <Select
              size="small"
              fullWidth
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">A → Z</MenuItem>
              <MenuItem value="desc">Z → A</MenuItem>
            </Select>
          </MenuItem>
        </Menu>
      </Box>

      {/* === Table ====*/}
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Box>
    </Paper>
  );
}
