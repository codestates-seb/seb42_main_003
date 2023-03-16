import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {margin: 0;padding: 0;border: none;background: none;font-size: 100%;font-family: 'Noto Sans KR', sans-serif;box-sizing: border-box;-webkit-tap-highlight-color: transparent;}
  ol,ul {list-style: none;} 
  em {font-size: normal;} 
  img {vertical-align: top;outline: none;}
  input,
  select,
  textarea,
  button {appearance: none;-webkit-appearance: none;outline: none;background: none;border: none;border-radius: 0;margin: 0;padding: 0;line-height: 1;}
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {border:0;font-size:100%;font:inherit;margin:0;padding:0;vertical-align:baseline}
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display:block}
  ol, ul {list-style:none}
  blockquote, q {quotes:none}
  blockquote:after, blockquote:before, q:after, q:before {content:'';content:none}
  table {border-collapse:collapse;border-spacing:0}
  input:-webkit-autofill, 
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {background: transparent;background-clip: text;-webkit-background-clip: text; -webkit-text-fill-color: var(--black);}
  textarea {resize: none;} 
  ::placeholder {font: inherit;}
  a {text-decoration: none;color: inherit;}
  a:visited {background: none;color:inherit;}
  a:active {background: none;color:inherit;}
  body {
    overflow-x: hidden; line-height: 1;
    font-family: 'Noto Sans KR', sans-serif, 
    -apple-system, 
    BlinkMacSystemFont, 
    system-ui, 
    Roboto, 
    'Helvetica Neue', 
    'Segoe UI', 
    'Apple SD Gothic Neo', 
    'Noto Sans KR', 
    'Malgun Gothic', sans-serif;
    font-size: 14px;
    color: var(--black);
  }
`;
