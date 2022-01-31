import { ButtonStyle } from './style'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ onClick, label, loading }) => {
  return (
    <ButtonStyle onClick={onClick}>
      {label}
      {loading && (
        <FontAwesomeIcon style={{ marginLeft: 8 }} spin icon={faSpinner} />
      )}
    </ButtonStyle>
  )
}

export default Button
