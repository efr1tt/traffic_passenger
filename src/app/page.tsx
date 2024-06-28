"use client"

import { PassengeerTable } from "./components/PassengerTable/PassengerTable"
import Head from "next/head"

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PassengeerTable />
    </div>
  )
}
