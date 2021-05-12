import { Link } from 'react-router-dom';

import * as userService from '../../utilities/users-service';
import { Menu } from 'antd';

const styles = {

}

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
<Menu>
  <Menu.Item key="favorite" >
  <Link to="/favorite">Favorite</Link>
  </Menu.Item>
</Menu>

    // <nav>
    //   <Link to="/orders">Order History</Link> 
    //   &nbsp; | &nbsp;
    //   <Link to="/orders/new">Favorite</Link>
    //   &nbsp; | &nbsp;
    //   <span>Welcome, {user.name}</span>
    //   &nbsp; | &nbsp;
    //   <Link to="" onClick={handleLogOut}>Log Out</Link>
    // </nav>
  );
}