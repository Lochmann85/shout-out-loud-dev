import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon, Button } from 'semantic-ui-react';

const AddIcon = styled(Icon) `
   margin: 0px!important;
`;

const HeadingWithAddButton = ({ title, linkUrl, showAddButton }) => {
   let AddButton = null;
   if (showAddButton) {
      AddButton = <Button primary as={Link} to={linkUrl} floated="right" >
         <AddIcon name="plus" />
      </Button>;
   }

   return (
      <div>
         {title}
         {AddButton}
      </div>
   );
};

HeadingWithAddButton.propTypes = {
   title: PropTypes.string.isRequired,
   linkUrl: PropTypes.string,
   showAddButton: PropTypes.bool.isRequired,
};

export default HeadingWithAddButton;