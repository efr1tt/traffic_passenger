"use client"

import Image from "next/image"
import styles from "./page.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import UserForm from "./components/UserForm/UserForm"
import { PassengeerTable } from "./components/PassengerTable/PassengerTable"

export default function Home() {
  return (
    <div>
      <PassengeerTable />
    </div>
  )
}
