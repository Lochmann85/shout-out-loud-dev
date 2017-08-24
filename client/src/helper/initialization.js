import { injectGlobal } from 'styled-components';

import colors from './../assets/colors/shout-out-loud-colors.json';

const injected = injectGlobal`
html body {background-color:${colors.globalBackground}};
#root {height:100%};
`;

export default injected;