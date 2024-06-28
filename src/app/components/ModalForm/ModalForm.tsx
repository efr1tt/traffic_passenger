interface IFormInput {
  email: string
  name: string
}

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

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
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ModalForm
