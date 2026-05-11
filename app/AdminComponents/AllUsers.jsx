"use client";

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";


import { Edit, Delete, Visibility, Search } from "@mui/icons-material";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    role: "Admin",
    status: "Active",
    phone: "+92 300 1234567",
    createdAt: "10 May 2026",
  },
  {
    id: 2,
    name: "Ali Khan",
    email: "ali@gmail.com",
    role: "User",
    status: "Blocked",
    phone: "+92 311 9876543",
    createdAt: "12 May 2026",
  },
  {
    id: 3,
    name: "Sarah Ahmed",
    email: "sarah@gmail.com",
    role: "SuperAdmin",
    status: "Active",
    phone: "+92 322 1112233",
    createdAt: "14 May 2026",
  },
];

function CustomToolbar({ search, setSearch, roleFilter, setRoleFilter }) {
  return (
    <GridToolbarContainer>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          width: "100%",
          p: 2,
          justifyContent: "space-between",
        }}
      >
        <TextField
          size="small"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
          sx={{
            width: {
              xs: "100%",
              sm: 300,
            },
          }}
        />

        <Select
          size="small"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{
            minWidth: 180,
          }}
        >
          <MenuItem value="All">All Roles</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="SuperAdmin">Super Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </Stack>
    </GridToolbarContainer>
  );
}

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);




  const columns = [
    {
      field: "profile",
      headerName: "User",
      flex: 1.5,
      minWidth: 250,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Avatar>{params.row.name[0]}</Avatar>

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
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "SuperAdmin"
              ? "secondary"
              : params.value === "Admin"
                ? "primary"
                : "default"
          }
          size="small"
        />
      ),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "error"}
          size="small"
        />
      ),
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
      minWidth: 180,
      sortable: false,
      renderCell: () => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <IconButton color="primary">
            <Visibility />
          </IconButton>

          <IconButton color="warning">
            <Edit />
          </IconButton>

          <IconButton color="error">
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "95%",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
          ml: 1,
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #eee",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Users Management
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Manage all system users from here.
        </Typography>
      </Box>

      <Box sx={{ height: 600, width: "90%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
          slots={{
            toolbar: () => (
              <CustomToolbar
                search={search}
                setSearch={setSearch}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
              />
            ),
          }}
          sx={{
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224,224,224,0.4)",
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
