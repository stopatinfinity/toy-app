import Button from './button'

const Header = (props: {title: any, onAdd: any}) => {
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            <Button color='green' text='Add' onClick={props.onAdd} />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}

export default Header;