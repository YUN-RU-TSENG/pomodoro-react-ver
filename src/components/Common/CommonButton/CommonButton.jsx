import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
    width: ${(props) => {
        if (props.type === 'block') return '100%'
        return 'auto'
    }};

    padding: 4px 12px;

    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
    border: 1px solid #cfcfcf;
    border-color: ${(props) => {
        if (props.color === 'green') return '#4ed3a9'
        else return '#00000080'
    }};
    background-color: ${(props) => {
        if (props.color === 'green') return '#4ed3a9'
        else return '#ededed'
    }};
    color: ${(props) => {
        if (props.color === 'green') return '#fff'
        else return '#00000080'
    }};

    text-align: center;
    transition: all 0.3s ease;
`

function CommonButton({ children, color, type, onClick }) {
    return (
        <Button color={color} type={type} onClick={onClick}>
            {children}
        </Button>
    )
}

CommonButton.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['green', 'default']),
    type: PropTypes.oneOf(['inline', 'block']),
    onClick: PropTypes.func,
}

CommonButton.defaultProps = {
    color: 'default',
    type: 'inline',
}

export default CommonButton
