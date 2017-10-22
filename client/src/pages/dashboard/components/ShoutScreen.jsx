import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import colors from './../../../assets/colors/shout-out-loud-colors.json';
import { VerticalAlignTextWrapper } from './../../../assets/styled/Wrapper';
import fontSizeCalculation from './../../../helper/fontSizeCalculation';

import BaseLayoutLoader from './../../../components/layout/BaseLayoutLoader';
import shoutScreenFragment from './../graphql/fragments/shoutScreen';
import currentShoutQuery from './../graphql/queries/currentShoutQuery';
import queryErrorHandling from './../../../components/errorHandling/queryErrorHandling';

const ShoutScreenBackground = styled.div`
   background-color:${colors.screenBackground};
   height:62%;
   -webkit-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   -moz-box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   box-shadow:inset 0 0 15px 1px ${colors.logoDarkerBackground};
   margin:0 -1rem 3% -1rem;
   padding:90px;
   @media only screen and (max-width:767px) { 
	   padding:60px;
   };
   div > div {
      opacity: 0;
   };
   -webkit-transition: all 0.4s ease-out;
   -moz-transition: all 0.4s ease-out;
   -ms-transition: all 0.4s ease-out;
   -o-transition: all 0.4s ease-out;
   transition: all 0.4s ease-out;
   &.init {
      -webkit-transition: all 0.1s ease-in;
      -moz-transition: all 0.1s ease-in;
      -ms-transition: all 0.1s ease-in;
      -o-transition: all 0.1s ease-in;
      transition: all 0.1s ease-in;
      padding:40px;
      @media only screen and (max-width:767px) { 
         padding:30px;
      };
   };
   &.visible {
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      -ms-transition: all 0.2s ease-out;
      -o-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
      padding:60px;
      @media only screen and (max-width:767px) { 
         padding:40px;
      };
      div > div {
         opacity: 1;
      };
   };
   border:1px solid ${colors.logoDarkerBackground};
   -webkit-border-radius:2rem;
   border-radius:2rem;
`;

const ShoutScreen = styled.div`
   background-color:${colors.logoLighterBackground};
   color:${colors.logoText};
   height:100%;
   width:100%;
   -webkit-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   -moz-box-shadow: 0 0 20px 20px ${colors.logoLighterBackground};
   box-shadow:0 0 20px 20px ${colors.logoLighterBackground};
   -webkit-border-radius:0.9rem;
   border-radius:0.9rem;
`;

class ShoutsScreen extends React.Component {

   static propTypes = {
      currentShoutQuery: PropTypes.shape({
         getCurrentShout: propType(shoutScreenFragment.shouts.document)
      })
   }

   constructor(props) {
      super(props);

      this.resized = false;
      this.unsubscribe = null;

      this.loaded = false;
      this.currentShoutId = "";

      this.state = {
         fontSize: "0px",
         transitionClass: ""
      };
   }

   _updateFontSize() {
      const currentShout = this.props.currentShoutQuery.getCurrentShout;

      let shoutFontSize;
      if (currentShout) {
         shoutFontSize = fontSizeCalculation.calculate(this.shoutContainer, "60", currentShout.message);
      }
      shoutFontSize = `${shoutFontSize}px`;

      if (this.state.fontSize !== shoutFontSize && !this.resized) {
         this.resized = true;
         this.setState({ fontSize: shoutFontSize }, () => { this.resized = false; });
      }
   }

   componentDidMount() {
      this.unsubscribe = this.props.currentShoutQuery.subscribeToCurrentShoutChanged();
      this._updateFontSize();
   }

   componentWillUnmount() {
      if (this.unsubscribe) {
         this.unsubscribe();
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.currentShoutQuery.getCurrentShout) {
         const shout = nextProps.currentShoutQuery.getCurrentShout;
         if (shout.id !== this.currentShoutId && shout.type !== "Empty") {
            this.currentShoutId = shout.id;
            this.setState({ transitionClass: "init" }, () => {
               setTimeout(() => this.setState({ transitionClass: "visible" }, () => {
                  setTimeout(() => this.setState({ transitionClass: "" }), 5600);
               }), 100);
            });
         }
      }
   }

   componentDidUpdate() {
      this._updateFontSize();
   }

   render() {
      const { currentShoutQuery } = this.props;
      if (currentShoutQuery.loading && !this.loaded) {
         this.loaded = true;
         return <BaseLayoutLoader />;
      }
      else if (currentShoutQuery.error) {
         console.log(currentShoutQuery.error);
         return <BaseLayoutLoader />;
      }

      const currentShout = currentShoutQuery.getCurrentShout;

      return (
         <ShoutScreenBackground className={this.state.transitionClass}>
            <ShoutScreen
               innerRef={shoutContainer => this.shoutContainer = shoutContainer}
            >
               <VerticalAlignTextWrapper fontSize={this.state.fontSize}>
                  {currentShout ? currentShout.message : ""}
               </VerticalAlignTextWrapper>
            </ShoutScreen>
         </ShoutScreenBackground>
      );
   }
}

export default queryErrorHandling(currentShoutQuery)(ShoutsScreen);
