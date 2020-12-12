import {Provider, useSelector} from 'react-redux';
import store from '../Reducer/Store'

function User() {
    return  
    ( <Provider store={store}>
    <div className="App">
      <h1>Songs(with the help of Redux)</h1>
      <SongList />
    </div>
  </Provider>)
}
export default Users;