import styled from 'styled-components';

const FullHeightWrapper = styled.div`
   height:100%;
`;

const WrapperWithOffset = styled(FullHeightWrapper) `
padding:4% 0;
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

const BasicFlexWrapper = styled.div.attrs({ direction: props => props.direction || "row" }) `
   display: -webkit-box;
   display: -moz-box;
   display: -ms-flexbox;
   display: -webkit-flex;
   display: flex;
   -webkit-flex-direction: ${props => props.direction};
   -ms-flex-direction: ${props => props.direction};
   flex-direction: ${props => props.direction};
   -webkit-align-items: center;
   -ms-flex-align: center;
   align-items: center;
`;

const TopOffsetWrapper = styled.div`
   padding-top: 2rem;
`;

export {
   FullHeightWrapper,
   WrapperWithOffset,
   HiddenWrapper,
   TextEllipsisWrapper,
   VerticalAlignTextWrapper,
   BasicFlexWrapper,
   TopOffsetWrapper
};