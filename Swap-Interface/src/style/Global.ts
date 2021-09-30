import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: HVD_Comic_Serif_Pro;
  src: url(./fonts/HVD_Comic_Serif_Pro.otf);
}
@font-face {
  font-family: Sofia_Pro_Regular;
  src: url(./fonts/Sofia_Pro_Regular.otf);
}
@font-face {
  font-family: Sofia_Pro_Semi_Bold;
  src: url(./fonts/Sofia_Pro_Semi_Bold.otf);
}
* {
  font-family: Sofia_Pro_Regular;
}
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .icon_sidebar
  {
    margin-right: 20px;
  }
.jpBRLF
{
  color: #848282;
font-weight: 700;
font-size: 16px;
}
#join-pool-button,#join-pool-button:hover
{
  border-radius:18px !important;
  opacity:1 !important;
  width:100% !important;
}
#swap-page button.htxlrH:hover,#join-pool-button:hover,#warp-page button:hover {
  background-color:#9498ff;
}
button div
{
  // color: rgb(144,150,152) !important;
  font-size: 16px !important;
font-weight: 600 !important;
line-height: 1.5 !important;
margin-right: 16px !important;
}
nav button,#join-pool-button,#swap-page button, #pool-page-button button,
#warp-page button,#confirm-swap-or-send{ 
  background-color: #1a1919 !important;

  // background-color: #9498ff !important;
  border-radius:5px !important;
  color:#fff !important;
  border:1px solid #515151 !important;

}
nav button:hover,#join-pool-button:hover,#swap-page button:hover, #pool-page-button button:hover,
#warp-page button:hover,#confirm-swap-or-send:hover {
  background-color: #fff !important;
  border-radius:5px !important;
  opacity:1 !important;
  color:#000 !important;
  border:1px solid #515151 !important;

}
nav button[aria-label="Toggle menu"] {
  background-color: transparent !important;
  border-radius:0px !important;
  height:32px !important;
}

#pair:hover
{
  background-color:transparent !important;
}
.evXgBv .desktop-icon,.desktop-icon
{
  width:156px !important;
  // margin-top:10px;
}
#pool-nav-link,#swap-nav-link,button,a
{
  box-shadow: 0px 0px 0px 0px rgba(14,14,44,0.4) inset !important;
}
.div_padding
{
  border-bottom: 1px solid #E9EAEB;
padding: 24px;
}
.heading_pool
{
  font-size: 20px;
  font-weight: 600;
line-height: 1.1;
margin-bottom:5px !important;
}
.desc_pool
{
 
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  font-weight: 700;
}
nav div[title="Bunny"]
{
  display:none;
}
.menulink div
{
  font-size:16px !important;
  color:#fff !important;
  text-transform:capitalize;
  font-weight: 700;
  font-family: Sofia_Pro_Semi_Bold !important;
}
.menulink div,.menulink img
{
  opacity:0.5 !important;
}
.menulink:hover div,.menulink:hover img
{
  opacity:1 !important;
}
// .menulink div a>div
// {
//   color:#868585 !important;
 
// }
div[role="button"] a {
  // text-transform: uppercase;
  font-size: 15px;
  font-family: Sofia_Pro_Semi_Bold !important;
}
.menulink img
{
  max-width:18px !important;
  min-width:18px !important;
}
.menulink svg
{
  // margin-right: 16px;
}
nav button[aria-label="Toggle menu"] svg {
  fill: #868585 !important;
}
#swap-page svg,#warp-page svg
{
  fill:#868585;
  color:#868585;
}
.bor_radius>div,.bor_radius a
{
  border-radius:5px;
}
.bor_radius div a
{
  // background-color:transparent;
}
.bor_radius div a:hover,.bor_radius div a:hover:not(:disabled):not(.button--disabled):not(:active)
{
  background-color: #fff !important;
  color:#000 !important;
  opacity:1 !important;
}
.bor_radius div a(:active),.bor_radius div a:active
{
  background-color: #fff !important;
  color:#000 !important;
}
.bor_radius div a:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled),
.bor_radius div a[variant="subtle"] {
  opacity: 1;
  background-color: #fff !important;
  color:#000 !important;
}
// #swap-page button,#pool-page-button button
// {
//   background-image: linear-gradient(90deg, #e754ff 61%, #e754ff 94%, #e754ff);
//   border: 1px solid #e754ff  !important;
//   box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
//   border-radius:18px !important;
// }
// #swap-page button:hover,#pool-page-button button:hover
// {
//   background-image: linear-gradient(45deg, #9498ff -6%, #9498ff 46%, #9498ff 69%);
//   border: 1px solid #9498ff  !important;
//   box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
//   border-radius:18px !important;
// }
#swap-page button[title="Settings"],
#swap-page button[title="Recent transactions"],
.btn_icon_center
{
  background:none !important;
  border:none !important;
}
#swap-page button.btn_icon_center, #pool-page-button button.btn_icon_center,#warp-page button.btn_icon_center
{
  border:none !important;
}
.arrow_color_grey .open-currency-select-button svg,
#add-liquidity-input-tokena svg,#add-liquidity-input-tokenb svg
{
  color:#ccc !important;
  // fill: #ccc !important;
}
#swap-currency-input,#swap-currency-input>div,
#swap-currency-output,#swap-currency-output>div,.radius_card,
#add-liquidity-input-tokena,#add-liquidity-input-tokena>div,
#add-liquidity-input-tokenb,#add-liquidity-input-tokenb>div
{
  border-radius: 5px;
  // background-color:#3535354f !important;
    // border: 1px solid #49484829;
}
#swap-currency-input>div,
#swap-currency-output>div,
.card_bg_1,.liqu_panel,
#add-liquidity-input-tokena>div,
#add-liquidity-input-tokenb>div
{
  border-radius: 5px;
  background-color:#f7f4f412 !important;
    border: 1px solid #49484829;
}
.liqu_panel_new
{
  background-color:#65636312 !important;
  border-radius: 5px;
  border: 1px solid #49484829;

}
#swap-currency-input>div,#swap-currency-output>div
{
  // background-color:#131022 !important;
}
div[data-reach-dialog-overlay]
{
z-index:21 !important;
}
.card_bg_1
{
 border-radius:10px;

}
.btn_yellow
{
  // background-color: #1a1919 !important;
  //   border-radius: 5px !important;
  //   color: #fff !important;
  //   border: 1px solid #515151 !important;

  background-image: linear-gradient(90deg, #1a1919  61%, #1a1919  94%, #1a1919);
border: 1px solid #515151  !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
border-radius:5px !important;
color:#fff !important;
}
.btn_yellow:hover
{
  background-image: linear-gradient(45deg, #fff  -6%, #fff  46%, #fff  69%);
border: 1px solid #515151  !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
border-radius:5px !important;
color:#000 !important;
}
.slippage_btn
{
  // background-color: #5250500f;
  // color:#868585;
  background-color: #c4c4c4;
    color: #000;
}
#token-search-input
{
  border:1px solid #ccc;
}
button[aria-label="Close the dialog"]:hover:not(:disabled):not(.button--disabled):not(:active)
 {
 opacity:1 !important;
}
button:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
  opacity:1 !important;
}
.input_color button,#swap-button
{
  color:#fff !important;
}
button div#pair
{
margin-left:16px !important;
}
#swap-page .price_icon svg,#warp-page .price_icon svg {
  fill: #24262e !important;
  color: #24262e !important;
}
#swap-page .price_icon svg:hover,
#warp-page .price_icon svg:hover

{
  fill: #9498ff !important;
  color: #9498ff !important;
}
#swap-page button.open-currency-select-button,
#pool-page-button .open-currency-select-button,
#warp-page button.open-currency-select-button,
#warp-page-button .open-currency-select-button
{
background:none !important;
border:none !important;
}

#swap-page button.open-currency-select-button:hover,
#pool-page-button .open-currency-select-button:hover,
#warp-page button.open-currency-select-button:hover,
#warp-page-button .open-currency-select-button:hover
{
background:none !important;
border:none !important;
}
.inpt_tran
{
  background-color:transparent !important;
  border: 1px solid #868585;
    border-radius: 10px;
    color: #868585;
}
.inpt_tran svg

{
  color: #868585;
  fill: #868585;
}
.menulink svg
{
  fill:#767576 !important;
  color:#767576 !important;
  height:20px;
  width:30px;
}
#swap-page,#warp-page
{
  border: 1px solid #49484829;
}
button[aria-label="Close the dialog"]
{
  color:#868585 !important;

}
button[aria-label="Close the dialog"] svg,a svg
{
  color:#868585 !important;
fill:#868585 !important;
}
a svg
{
  color:#868585 !important;
// fill:#868585 !important;
}
a, a svg,a>div
{
  color:#868585 !important;
}
nav button[aria-label="Toggle menu"]
{
  border:none !important;
}
.btn-flex
{
  display: flex;
    justify-content: space-between;
}
.btn-flex button
{
  height: 35px !important;
}
#token-search-input
{
  border: 1px solid #515151 !important;
  border-radius:5px;
}
@media only screen and (max-width:575px)
{
  .btn-flex button
  {
    padding-left:10px !important;
    padding-right:10px !important;

  }
}
a svg[fill="none"]
{
  fill:none !important;
}
#pool-page-button button.btn_hover_new
{
  background-color: transparent !important;
    border-radius: 5px !important;
    opacity: 1 !important;
    color: #fff !important;
    border: 1px solid #515151 !important;
}
#pool-page-button button.btn_hover_new:hover
{
  background-color: #fff !important;
    border-radius: 5px !important;
    color: #000 !important;
    border: 1px solid #515151 !important;
}

body
{
  background-image: url('/images/bg.png');
  background-position: bottom;
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
  // background-size:100% 400px;
}
#warp-page button[title="Settings"],
#warp-page button[title="Recent transactions"]
{
display:none;
}
.from_to_color
{
  color: #868585;
}
.grid_from_to
{
  display: grid;
    grid-template-columns: 40% 20% 40%;
    align-items:center;
    margin-top:20px;
}
.text-center-arrow
{
  text-align:center;
  margin-top:20px;
}
.mt-coin
{
  margin-top:20px;
}
.mx-auto
{
  margin-left:auto;
  margin-right:auto;
}
.text-center-img>div,
.text-center-arrow>div
{
  margin-left:auto;
  margin-right:auto;
}
.light_card_bg
{
  background-color:#262525 !important;
  border-radius:5px !important;
}
a[aria-label="Twitter"] svg
{
  width:16px !important;
}
#import-pool-link
{
  color:#fff !important;
  margin-left:5px !important;
}
.btn-block-100
{
  width:100% !important;
  margin-top:20px;
}
`

export default GlobalStyle
