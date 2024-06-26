"use client"
import React, { ChangeEvent } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { FormData } from "../../types/formData"
import { supabase } from "../../utils/supabase/supabaseClient"
import styles from "./UserForm.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { InputMask } from "primereact/inputmask"

const UserForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: new Date(),
      cost: null,
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { error } = await supabase.from("passenger").insert([
      {
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        current_adress: data.currentAdress,
        destination_adress: data.destinationAdress,
        luggage: data.luggage,
        cost: data.cost,
        date: data.date,
      },
    ])
    if (error) {
      console.error("Error inserting data:", error)
    } else {
      reset() // Очистите форму после успешной отправки
      alert("Data submitted successfully!")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        {...register("fullName", {
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
        placeholder="Укажите ФИО"
      />
      {errors?.fullName?.type === "required" && (
        <p style={{ color: "red", fontSize: "13px" }}>
          This field is required..
        </p>
      )}
      {/* <input
        className={styles.input}
        {...register("phoneNumber", { required: true })}
        placeholder="Укажите номер телефона"
      />
      {errors?.phoneNumber?.type === "required" && (
        <p style={{ color: "red", fontSize: "13px" }}>
          This field is required..
        </p>
      )} */}

      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <InputMask
            className={styles.input}
            {...field}
            id="phoneNumber"
            mask="+7(999)999-9999"
            placeholder="Укажите номер телефона"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
          />
        )}
      />
      {errors.phoneNumber && (
        <p style={{ color: "red", fontSize: "13px" }}>
          This field is required..
        </p>
      )}

      <input
        className={styles.input}
        {...register("currentAdress")}
        placeholder="Укажите текущий адрес"
      />
      <input
        className={styles.input}
        {...register("destinationAdress")}
        placeholder="Укажите адрес назначения"
      />
      <input
        className={styles.input}
        {...register("luggage")}
        placeholder="Укажите багаж"
      />
      {/* <input
        className={styles.input}
        type="number"
        {...register("cost")}
        placeholder="Укажите цену"
      /> */}

      <Controller
        name="cost"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            className={styles.input}
            type="number"
            {...field}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              const parsed = parseFloat(value)
              field.onChange(isNaN(parsed) ? null : parsed)
            }}
            value={field.value === null ? "" : field.value}
            placeholder="Укажите цену"
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            showIcon
            selected={field.value}
            onChange={(
              date: Date | null,
              event: React.SyntheticEvent<any> | undefined
            ) => {
              field.onChange(date)
            }}
            dateFormat="MMMM d, yyyy"
          />
        )}
      />
      <input
        className={styles.input}
        type="submit"
        value="Добавить пассажира"
        style={{ letterSpacing: "5px" }}
      />
    </form>
  )
}

export default UserForm
