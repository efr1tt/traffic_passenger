"use client"

import Image from "next/image"
import styles from "./page.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import UserForm from "./components/UserForm/UserForm"
type Inputs = {
  example: string
  exampleRequired: string
}

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <UserForm />
    </div>
  )
}
