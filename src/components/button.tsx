import PropTypes from 'prop-types'

const Button = (props: { color: string, text: string, onClick: any }) => {
    return <button 
                style={{backgroundColor: props.color}} 
                className='btn'
                onClick={props.onClick}
           > 
            {props.text}
           </button>
};

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;