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

const VerticalAlignTextWrapper = styled(TextEllipsisWrapper) `
   font-size:${props => props.fontSize ? props.fontSize : "20px"};
   display: flex;
   justify-content:center;
   align-content:center;
   flex-direction:column;
   height:100%;
`;

export {
   FullHeightWrapper,
   HiddenWrapper,
   TextEllipsisWrapper,
   VerticalAlignTextWrapper
};