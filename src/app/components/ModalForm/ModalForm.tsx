interface IFormInput {
  email: string
  name: string
}

import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"

import UserForm from "../UserForm/UserForm"

function ModalForm() {
  const [open, setOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    reset() // Сброс формы после закрытия модального окна
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    handleClose() // Закрыть модальное окно после отправки формы
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Добавить пассажира
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "rgb(39, 37, 40)" }}>
          Заполните данные:
        </DialogTitle>
        <DialogContent>
          <UserForm />
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              margin="dense"
              label="Your Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </form> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ModalForm
