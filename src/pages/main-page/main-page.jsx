import { useGetAllUsersQuery } from "../../server/api"
import "./main-page.css"
import { AllUsers } from "../../components/users/users"
import { UserInfo } from "../../components/user-info/user-info"
import { useState } from "react"

export const MainPage = () => {
  const { data, isLoading, error, refetch: refetchAll } = useGetAllUsersQuery()
  const [userId, setUserId] = useState(null)
  const [isClicked, setIsClicked] = useState(false)

  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div className="main">
      <AllUsers
        data={data}
        isLoading={isLoading}
        setUserId={setUserId}
        setIsClicked={setIsClicked}
      />
      {isClicked ? (
        <UserInfo userId={userId} refetchAll={refetchAll} />
      ) : (
        <p className="main__text">Выберите пользователя</p>
      )}
    </div>
  )
}
