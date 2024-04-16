import "../../pages/main-page/main-page.css"
import { List, AutoSizer } from "react-virtualized"


export const AllUsers = ({data, isLoading, setUserId, setIsClicked}) => {
  const handleClick =({user}) => {
    setUserId(user.id),
    setIsClicked(true)
  }
    
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="list">
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={50}
            rowCount={data && data.length}
            overscanRowCount={3}
            rowRenderer={({ index, key, style }) => {
              const user = data[index]
              return (
                <div key={key} style={style} className="user" onClick={()=> handleClick({user})}>
                  <img
                    src="./img/small-icon.png"
                    alt="user icon"
                    className="user__img"
                  />
                  <div className="user__text">{index + 1}.</div>
                  <div className="user__text">{user?.firstName}</div>
                  <div className="user__text">{user?.lastName}</div>
                </div>
              )
            }}
          />
        )}
      </AutoSizer>
    </div>
  )
}
