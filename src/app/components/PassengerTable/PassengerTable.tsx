"use client"
import React, { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase/supabaseClient"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

import styles from "./PassengerTable.module.css"

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
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },

    {
      field: "full_name",
      headerName: "ФИО пассажира",
      width: 160,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "phone_number",
      headerName: "Номер телефона",
      width: 130,
      sortable: false,
      filterable: true,
      disableColumnMenu: true,
    },
    {
      field: "current_adress",
      headerName: "Откуда",
      width: 130,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "destination_adress",
      headerName: "Куда",
      width: 130,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "luggage",
      headerName: "Багаж",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "cost",
      headerName: "Цена",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
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
          <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
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
        </div>
      )}
    </div>
  )
}
