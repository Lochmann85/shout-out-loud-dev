import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BaseIcon } from './../../assets/styled/UI';

const FloatWrapper = styled.div`
   float: ${props => props.float};
   ${props => props.marginRight ? `margin-right: ${props.marginRight}` : null};
   ${props => props.marginLeft ? `margin-left: ${props.marginLeft}` : null};
`;

const DescriptionWithEditAndDelete = (props) => {

   /**
    * @private
    * @function _onDeleteClick
    * @description Inovkes the on delete click function from the parent.
    */
   const _onDeleteClick = () => {
      props.onDeleteClick(props.id);
   };

   const deleteIcon = props.onDeleteClick ?
      <BaseIcon color="red" name="delete" onClick={_onDeleteClick} link /> : null;

   const editIcon = <Link to={`/${props.routePrefix}/update/${props.id}`} >
      <BaseIcon color="blue" name="edit" />
   </Link>;

   const editColumn = props.isSelected ?
      <FloatWrapper float="right" marginLeft="0.25em">
         {deleteIcon}
         {editIcon}
      </FloatWrapper> : null;

   return (
      <div>
         <FloatWrapper float="left" marginRight="0.25em">{props.description}</FloatWrapper>
         {editColumn}
      </div>
   );
};

DescriptionWithEditAndDelete.propTypes = {
   id: PropTypes.string.isRequired,
   routePrefix: PropTypes.string.isRequired,
   isSelected: PropTypes.bool.isRequired,
   onDeleteClick: PropTypes.func,
   description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
};

export default DescriptionWithEditAndDelete;
