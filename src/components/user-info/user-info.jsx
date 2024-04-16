import { useEffect, useState } from "react"
import "../../pages/main-page/main-page.css"
import { useChangeUserMutation, useGetUserByIdQuery } from "../../server/api"
import { useForm } from "react-hook-form"

export const UserInfo = ({ userId, refetchAll }) => {
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useGetUserByIdQuery({
    id: userId,
  })

  const [changeUser, { isLoading: changesLoading }] = useChangeUserMutation()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [changeError, setChangeError] = useState(null)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName)
      setLastName(userData.lastName)
      setEmail(userData.email)
      setAge(userData.age)
    }
  }, [userData])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  })
  const onSubmit = async () => {
    try {
      await changeUser({
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
      })

      refetch()
      refetchAll()
      setIsChanging(false)
    } catch (error) {
      setChangeError(error.message)
    }
  }

  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div className="info">
      <div className="info__top">
        <div className="info__top_div">
          <p className="info__top_text">
            {isLoading ? (
              <p>Загружаем...</p>
            ) : (
              userData.firstName + " " + userData.lastName
            )}
          </p>
        </div>
      </div>

      <div className="form">
        <img src="./img/big-icon.png" alt="user image" className="form__img" />
        <form className="form__box" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__box_div">
            <label className="form__box_label">Имя</label>
            <input
              className="form__box_input"
              type="text"
              {...register("firstName", {
                required: "Поле 'Имя' обязательно для заполнения",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа!",
                },
              })}
              placeholder="Введите Ваше Имя"
              value={isLoading ? "Подождите..." : firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                setIsChanging(true)
              }}
            />
            {errors?.firstName ? (
              <p className="error">{errors?.firstName?.message || "Error!"}</p>
            ) : null}
          </div>
          <div className="form__box_div">
            <label className="form__box_label">Фамилия</label>
            <input
              className="form__box_input"
              type="text"
              {...register("lastName", {
                required: "Поле 'Фамилия' обязательно для заполнения",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа!",
                },
              })}
              placeholder="Введите фамилию"
              value={isLoading ? "Подождите..." : lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                setIsChanging(true)
              }}
            />
            {errors?.lastName ? (
              <p className="error">{errors?.lastName?.message || "Error!"}</p>
            ) : null}
          </div>
          <div className="form__box_div">
            <label className="form__box_label">Email</label>
            <input
              className="form__box_input"
              type="text"
              placeholder="Введите email"
              {...register("email", {
                required: "Поле 'Email' обязательно для заполнения",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов!",
                },
              })}
              value={isLoading ? "Подождите..." : email}
              onChange={(e) => {
                setEmail(e.target.value)
                setIsChanging(true)
              }}
            />
            {errors?.email ? (
              <p className="error">{errors?.email?.message || "Error!"}</p>
            ) : null}
          </div>
          <div className="form__box_div">
            <label className="form__box_label">Возраст</label>
            <input
              className="form__box_input"
              type="number"
              placeholder="Введите возраст"
              {...register("age", {
                required: "Поле 'Возраст' обязательно для заполнения",
              })}
              value={isLoading ? "Подождите..." : age}
              onChange={(e) => {
                setIsChanging(true)
                setAge(e.target.value)
              }}
            />
            {errors?.age ? (
              <p className="error">{errors?.age?.message || "Error!"}</p>
            ) : null}
          </div>

          <input
            type="submit"
            value={changesLoading ? "Подождите" : "Сохранить"}
            disabled={!isChanging || changesLoading}
            className="form__button"
          />
          {changeError && <p>{changeError}</p>}
        </form>
      </div>
    </div>
  )
}
