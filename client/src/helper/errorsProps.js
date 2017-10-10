import PropTypes from 'prop-types';

export default PropTypes.arrayOf(PropTypes.shape({
   message: PropTypes.string.isRequired,
   key: PropTypes.string
}));