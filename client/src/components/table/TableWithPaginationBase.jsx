import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Button, Dropdown } from 'semantic-ui-react';

import { InfoMessage, SegmentBackground } from './../../assets/styled/UI';
import { BasicFlexWrapper } from './../../assets/styled/Wrapper';

const RightAlignedContent = styled(BasicFlexWrapper) `
   -webkit-flex: 1 1 auto;
   -ms-flex: 1 1 auto;
   flex: 1 1 auto;
   -webkit-justify-content: flex-end;
   -ms-flex-pack: end;
   justify-content: flex-end;
`;

const StyledEntriesText = styled.div`
   margin-right: 0.5rem;
`;

const AlignedDropdown = styled(Dropdown) `
   margin-right: 3rem!important;
`;

const numberOfVisibleEntries = [
   { key: "10", text: "10", value: 10 },
   { key: "20", text: "20", value: 20 },
   { key: "30", text: "30", value: 30 },
];

class TableWithPaginationBase extends React.Component {

   static propTypes = {
      tableEntries: PropTypes.array,
      noEntriesFoundComment: PropTypes.string.isRequired,
      createTableBody: PropTypes.func.isRequired,
      createTableHeader: PropTypes.func.isRequired,
      numberOfColumns: PropTypes.number.isRequired,
   }

   constructor(props) {
      super(props);

      this.state = {
         selectedNumberOfVisibleEntries: numberOfVisibleEntries[0].value,
         firstVisibleIndex: 0,
      };
   }

   render() {
      const { selectedNumberOfVisibleEntries, firstVisibleIndex } = this.state;
      const {
         tableEntries,
         noEntriesFoundComment,
         createTableBody,
         createTableHeader,
         numberOfColumns,
      } = this.props;

      if (tableEntries && Array.isArray(tableEntries) && tableEntries.length > 0) {
         const visibleTableEntries = tableEntries.slice(firstVisibleIndex, firstVisibleIndex + selectedNumberOfVisibleEntries);

         let numberOfPages = parseInt(tableEntries.length / selectedNumberOfVisibleEntries, 10);
         if (tableEntries.length % selectedNumberOfVisibleEntries !== 0) {
            numberOfPages += 1;
         }

         const currentPageNumber = this._calculateCurrentPageNumber(),
            tableBody = createTableBody(visibleTableEntries),
            tableHeader = createTableHeader();

         return (
            <SegmentBackground>
               <Table celled compact selectable unstackable>
                  {tableHeader}
                  {tableBody}
                  <Table.Footer>
                     <Table.Row>
                        <Table.HeaderCell colSpan={numberOfColumns}>
                           <BasicFlexWrapper direction="row">
                              <div>{currentPageNumber} / {numberOfPages}</div>
                              <RightAlignedContent direction="row">
                                 <StyledEntriesText>Entries per page</StyledEntriesText>
                                 <AlignedDropdown selection compact
                                    name="selectedNumberOfVisibleEntries"
                                    value={selectedNumberOfVisibleEntries}
                                    options={numberOfVisibleEntries}
                                    onChange={this._handleChange} />
                                 <Button.Group>
                                    <Button icon="angle double left"
                                       onClick={this._showFirstPage} />
                                    <Button icon="angle left"
                                       onClick={this._showPreviousPage} />
                                    <Button icon="angle right"
                                       onClick={this._showNextPage} />
                                    <Button icon="angle double right"
                                       onClick={this._showLastPage} />
                                 </Button.Group>
                              </RightAlignedContent>
                           </BasicFlexWrapper>
                        </Table.HeaderCell>
                     </Table.Row>
                  </Table.Footer>
               </Table>
            </SegmentBackground>
         );
      }
      else {
         return <InfoMessage visible content={noEntriesFoundComment} />;
      }
   };

   _handleChange = (event, { name, value }) => this.setState({ [name]: value });

   _calculateCurrentPageNumber = () => {
      const { firstVisibleIndex, selectedNumberOfVisibleEntries } = this.state;

      return Math.ceil(firstVisibleIndex / selectedNumberOfVisibleEntries) + 1;
   }

   _showFirstPage = () => {
      const { firstVisibleIndex } = this.state;

      if (firstVisibleIndex > 0) {
         this.setState({ firstVisibleIndex: 0 });
      }
   };

   _showPreviousPage = () => {
      const { firstVisibleIndex, selectedNumberOfVisibleEntries } = this.state;

      if (firstVisibleIndex - selectedNumberOfVisibleEntries >= 0) {
         this.setState({ firstVisibleIndex: firstVisibleIndex - selectedNumberOfVisibleEntries });
      }
   };

   _showNextPage = () => {
      const { firstVisibleIndex, selectedNumberOfVisibleEntries } = this.state;
      const { tableEntries } = this.props;

      if (tableEntries && Array.isArray(tableEntries)) {
         if (firstVisibleIndex + selectedNumberOfVisibleEntries < tableEntries.length) {
            this.setState({ firstVisibleIndex: firstVisibleIndex + selectedNumberOfVisibleEntries });
         }
      }
   };

   _showLastPage = () => {
      const { firstVisibleIndex, selectedNumberOfVisibleEntries } = this.state;
      const { tableEntries } = this.props;

      if (tableEntries && Array.isArray(tableEntries)) {
         if (firstVisibleIndex + selectedNumberOfVisibleEntries <= tableEntries.length) {

            const remainingEntries = tableEntries.length % selectedNumberOfVisibleEntries;
            if (remainingEntries === 0) {
               this.setState({ firstVisibleIndex: tableEntries.length - selectedNumberOfVisibleEntries });
            }
            else {
               this.setState({ firstVisibleIndex: tableEntries.length - remainingEntries });
            }
         }
      }
   };
}

export default TableWithPaginationBase;