"use client"
import React, { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase/supabaseClient"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import Box from "@mui/material/Box"
import styles from "./PassengerTable.module.css"
import ModalForm from "../ModalForm/ModalForm"

interface Passenger {
  id: string
  seat_number: string
  full_name: string
  phone_number: string
  current_adress: string
  destination_adress: string
  luggage: string
  cost: number
}

export default function PassengeerTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataPassenger, setDataPassenger] = useState<Passenger[]>([])

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },

    {
      field: "full_name",
      headerName: "ФИО",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "НОМЕР ТЕЛЕФОНА",
      sortable: false,
      filterable: true,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "current_adress",
      headerName: "ОТКУДА",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "destination_adress",
      headerName: "КУДА",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "luggage",
      headerName: "БАГАЖ",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "cost",
      headerName: "ЦЕНА",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 100,
    },
  ]

  useEffect(() => {
    const fetchPassengers = async () => {
      const { data, error } = await supabase
        .from("passenger")
        .select(
          "id, seat_number, full_name, phone_number, current_adress, destination_adress, luggage, cost"
        )

      if (!error && data) {
        setIsLoading(false)
        setDataPassenger(data)
      }
    }
    fetchPassengers()
  }, [])

  console.log("dataPassenger: ", dataPassenger)
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          <div>
            <Box className={styles.dataGrid}>
              <DataGrid
                sx={{
                  ".MuiDataGrid-columnSeparator": {
                    display: "none",
                  },
                  ".MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "550 !important",
                    color: "#1976d2 !important",
                    fontFamily: "Roboto",
                    letterSpacing: "1px",
                  },
                }}
                rows={dataPassenger}
                columns={columns}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                  },
                }}
              />
            </Box>

            <div className={styles.buttonContainer}>
              <ModalForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
