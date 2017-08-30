import styled from 'styled-components';

const FullHeightWrapper = styled.div`
   height:100%;
`;

const HiddenWrapper = styled.div`
   display:none;
`;

const TextEllipsisWrapper = styled.div`
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export {
   FullHeightWrapper,
   HiddenWrapper,
   TextEllipsisWrapper
};