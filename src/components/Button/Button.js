import { Btn, BtnWrapper } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <BtnWrapper>
      <Btn type="button" onClick={onClick}>
        Load more
      </Btn>
    </BtnWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
