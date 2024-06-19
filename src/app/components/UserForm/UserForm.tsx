import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import { FormData } from "../../types/formData"
import { supabase } from "../../utils/supabase/supabaseClient"

const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { error } = await supabase.from("passenger").insert([
      {
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        current_adress: data.currentAdress,
        destination_adress: data.destinationAdress,
        luggage: data.luggage,
        cost: data.cost,
      },
    ])
    if (error) {
      console.error("Error inserting data:", error)
    } else {
      reset() // Очистите форму после успешной отправки
      alert("Data submitted successfully!")
    }
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("fullName", { required: true })}
        placeholder="Укажите ФИО"
      />
      <input
        {...register("phoneNumber", { required: true })}
        placeholder="Укажите номер телефона"
      />
      <input
        {...register("currentAdress", { required: true })}
        placeholder="Укажите текущий адрес"
      />
      <input
        {...register("destinationAdress", { required: true })}
        placeholder="Укажите адрес назначения"
      />
      <input
        {...register("luggage", { required: true })}
        placeholder="Укажите багаж"
      />
      <input
        {...register("cost", { required: true })}
        placeholder="Укажите цену"
      />
      <input
        type="submit"
        value="Добавить пассажира"
        style={{ letterSpacing: "5px" }}
      />
    </form>
  )
}

export default UserForm
