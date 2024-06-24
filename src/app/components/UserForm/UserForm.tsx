import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { FormData } from "../../types/formData"
import { supabase } from "../../utils/supabase/supabaseClient"
import styles from "./UserForm.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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
    console.log(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        {...register("fullName", { required: true })}
        placeholder="Укажите ФИО"
      />
      <input
        className={styles.input}
        {...register("phoneNumber", { required: true })}
        placeholder="Укажите номер телефона"
      />
      <input
        className={styles.input}
        {...register("currentAdress", { required: true })}
        placeholder="Укажите текущий адрес"
      />
      <input
        className={styles.input}
        {...register("destinationAdress", { required: true })}
        placeholder="Укажите адрес назначения"
      />
      <input
        className={styles.input}
        {...register("luggage", { required: true })}
        placeholder="Укажите багаж"
      />
      <input
        className={styles.input}
        {...register("cost", { required: true })}
        placeholder="Укажите цену"
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
