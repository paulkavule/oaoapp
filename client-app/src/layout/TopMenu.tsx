import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"


function TopMenu(){
    return(
        <Menu fixed='top' inverted color='grey'>
            <Menu.Item as={NavLink} to='/' exact header>
                <img src='/assets/mlogo.png' alt='logo' style={{marginRight: 10, width:"20px"}}/>
            </Menu.Item>
            <Menu.Item name='editorials' active={true} as={NavLink} to='/accountopening'> 
                        Account opening
            </Menu.Item>
            <Menu.Item name='reviews' active={false} as={NavLink} to='/'>
                Account amendment
            </Menu.Item>

            <Menu.Item  name='upcomingEvents' active={false} as={NavLink} to='/'>
                Online loan application
            </Menu.Item>
            
        </Menu>
    )
}

export default TopMenu