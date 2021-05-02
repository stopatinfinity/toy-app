import { useLocation } from 'react-router-dom'
import Button from './button'

const Header = (props: {title: any, onAdd: any, showAdd: any}) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' && <Button color={props.showAdd ? 'red' : 'green'} text={props.showAdd ? 'Close' : 'Add'}
            onClick={props.onAdd} />}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}

export default Header;