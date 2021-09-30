import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
 
// * {
//   font-family: 'Roboto', sans-serif;
//   }
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
  // *::-webkit-scrollbar {
  //   width: 5px;
  // }
  // *::-webkit-scrollbar-thumb {
  //   background: #ff841a;
  //   border-radius: 0px;
  // }
  .hvd_comic_serif {
    // font-family: HVD_Comic_Serif_Pro;
    font-family: Sofia_Pro_Semi_Bold !important;
    font-weight: 400;
  }
  .dash_subheading {
    font-size: 20px;
  }
  .white_box {    
    box-shadow: -4px 5px 10px 2px rgb(0 0 0 / 20%);
  }
  .vision_card_panel {
    // max-width: 600px;
    // margin: 10px auto 0;
  }
  .menulink  div {
    font-size: 18px;
    font-family: Sofia_Pro_Semi_Bold !important;
    text-transform: uppercase;
  }
  div[role="button"] a {
    // text-transform: uppercase;
    font-size: 15px;
    font-family: Sofia_Pro_Semi_Bold !important;
  }
  button div {
    font-family: Sofia_Pro_Semi_Bold !important;
    font-weight: 400 !important;
    font-size: 18px !important;
    // color: #ccc !important;
  }
  button {
    font-family: Sofia_Pro_Semi_Bold !important;
    font-weight: 400 !important;
  }
  .dash_heading_1
  {
    font-weight: 600;
    font-size:2rem;
    margin-bottom:20px;
  }
  .orange_head
  {
    font-size:2rem;
    font-weight:600;
    text-align:left !important;
  }
  .card_farms_head {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 20px;
    color: rgb(243, 132, 30);
}
.menulink div
{
  font-size:16px !important;
  color:#fff !important;
  text-transform:capitalize;
  font-weight: 700;
}
.menulink div,.menulink img
{
  opacity:0.5 !important;
}
.menulink:hover div,.menulink:hover img
{
  opacity:1 !important;
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
.icon_sidebar
{
  margin-right: 20px;
}
.white_box {
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%) !important;
}
.card_3_tiele
{
  color: #868585;
font-size: 20px;
font-weight: 700;
}
.card_small
{
  font-size:16px !important;
}
.card_3_subtiele
{
  font-size: 16px;
font-weight: 700;
color:#868585;
}
.btn_yellow,.card_radius button.btn_yellow
{
  background-image: linear-gradient(90deg, transparent  61%, transparent 94%, transparent) !important;
  background-color:transparent !important;
border: 1px solid #515151 !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
border-radius:5px !important;
color:#fff !important;
}
// button[aria-label="Close the dialog"]
// {
//   border:none !important;
// }
// button[aria-label="Close the dialog"]:hover
// {
//  background-color:transparent !important;
//  background:transparent !important;

// }
.btn_yellow:hover,.card_radius button.btn_yellow:hover
{
  background-image: linear-gradient(45deg, #fff -6%, #fff 46%, #fff 69%);
  background-color:#fff !important;

border: 1px solid #515151  !important;
color: #000 !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
border-radius:5px !important;
}
button
{
  box-shadow: 0 0 0 0px #a82731 !important;
}
.or_h
{
  color: rgb(243, 132, 30);
}
button div
{
  // color: rgb(144,150,152) !important;
  font-size: 16px !important;
font-weight: 600 !important;
line-height: 1.5 !important;
margin-right: 16px !important;
}
nav button {
  background-color: #1a1919 !important;
  border-radius:5px !important;
  color:#fff !important;
  border:1px solid #515151 !important;
}
nav button:hover {
  background-color: #fff !important;
  border-radius:5px !important;
  color:#000 !important;
  border:1px solid #515151 !important;

}
nav button[aria-label="Toggle menu"] {
  background-color: transparent !important;
  border-radius:0px !important;
  border:none !important;
}
nav button[aria-label="Toggle menu"] svg
{
  fill:#868585 !important;
}
.card_radius,.white_box
{
  border-radius:10px !important;
}
.lable_color Label,.lable_color div,.label_color
{
  // color:#a82731 !important;
}
.card_radius button,.bor_rad div
{
  border-radius:32px !important;
}
.tab_radius div a,.tab_radius div,.tab_radius>div>div
{
  border-radius:5px !important;

}
.tab_radius div a:hover,.tab_radius div a:hover:not(:disabled):not(.button--disabled):not(:active),
.tab_radius div a[variant="subtle"]
{
  background-color: #fff !important;
  color:#000 !important;
}
button[aria-label="Close the dialog"]:hover:not(:disabled):not(.button--disabled):not(:active)
 {
  background-color: transparent !important;
  border-color: currentColor;
}
.btn_not_found
{
  background-color:transparent !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
color:#fff !important;
border-radius:5px !important;
border: 1px solid #515151 !important;

}
.btn_not_found:hover
{
  background-image: linear-gradient(45deg, #fff -6%, #fff 46%, #fff 69%);
border: 1px solid #515151 !important;
box-shadow: inset 0px 0px 0px rgba(14,14,44,0.4);
border-radius:5px !important;
color:#000 !important;
}
.menulink svg
{
  fill:#767576 !important;
  color:#767576 !important;
  height:20px;
  width:30px;
}
.menulink div[role="button"] a
{
  text-transform:initial !important;
}
.green_txt_d
{
  color:#868585;
}
.dash_heading_sm_1
{
  font-size:20px;
  line-height:30px;
}
.grid_100
{
  grid-column: span 12 !important;
}
.card_radius button.harvest_btn_rad,.bor_rad div .harvest_btn_rad
{
  border-radius: 5px !important;
  max-height: 30px;
}
.px-0{
  padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    max-width:100% !important;
}
.banner_swap_bg{
  padding: 32px 32px !important;
  // background: linear-gradient(139.73deg, #201b3c 0%, #302a56 100%);
  // background: linear-gradient(139.73deg,#4235891c 0%,#302a5680 100%);
  // background: linear-gradient(
  //   139.73deg
  //   ,#3e338b29 0%,#302a56ad 100%);
  // background:linear-gradient( 139.73deg ,#201b4254 0%,#201b422e 100%);
    // margin-bottom: 48px;
}
.h1_big
{
  font-size:40px;
}
.padd_around
{
  padding-left:24px;
  padding-right:24px;
}
body
{
  background-image: url('/images/egg/bg.png');
  background-position: bottom;
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
  // background-size:100% 400px;
}
.text_big_val,.text_big_val div
{
  font-size:25px !important;
}
.card_title
{
font-size:16px !important;
margin-bottom:20px !important;
}
.card_sub_text_grey div
{
  font-size: 16px !important;
    font-weight: 700 !important;
    color: #868585 !important;
}
a, a svg,.text_grey_text
{
  color:#868585 !important;
}
button[aria-label="Close the dialog"]
{
  color:#868585 !important;

}
button[aria-label="Close the dialog"] svg, a svg
{
  color:#868585 !important;
fill:#868585 !important;
}
.detail_div_sec svg
{
  color:#868585 !important;
  fill:#868585 !important;
}
.font_14
{
  font-size:14px !important;
}
.card_radius
{
  border: 1px solid #49484829;
}
a.btn_not_found
{
  // color:inherit !important;
}
.card_totla
{
  width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  

}
.card_totla>div
{
  width: 100% !important;

}
.progres_theme
{
  margin-top:10px;
}
.flex_tot
{
  display: grid;
    grid-template-columns: 45% 45%;
    gap: 10%;
    margin-top:20px;
    margin-bottom:20px;
}
.val_ref
{
margin-bottom:15px;
}
.vision_card_panel
{
height:100%;
}
.img_div img
{
  width:45px !important;
  // padding-right:10px;
}
.img_div
{
  display: flex;
  align-items: center;
}
.img_div span
{
  padding-left:5px;
  font-size:20px;
  font-weight:700;
}
.align_center
{
  align-items:center;
}
.just_end
{
  justify-content:flex-end;
}
.just_end span
{
  font-size:18px !important;

}
.coin_name_color
{
  color:#868585;
}
.flex_tot.mt-0
{
  margin-top:0px !important;
}
.flex_sm span,.flex_sm div
{
  font-size:12px !important;
}
// .flex_sm>div
// {
//   display:flex;
//   justify-content:space-between;
// }
.sacn_color
{
  color:#deab0b;
}
.ref_pl
{
  padding-left:15px;
}
.btnh_trans
{
  background-color:transparent !important;
  border:none !important;
  padding:0px !important;
  width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
}
.btnh_trans:focus
{ background-color:transparent !important;
  border:none !important;
  padding:0px !important;
  width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0 0 0 0px #000 !important;

}
.btnh_trans.btn_end
{
  justify-content: flex-end !important;

}
.card_radius.min_h_unset
{
  min-height:unset !important;
  height:100% !important;
}
.card_totla
{
margin-bottom:20px;
}
.pos_end
{
  position: absolute;
    bottom: -25px;
    width: 90%;
}
.card_sub_text_grey
{
  display:flex;
  align-items: center;
    justify-content: space-between;
}
.actiob_dib_ma
{
  margin-top:0px !important;
}
.mb-emsi
{
  margin-bottom:20px;
}
.flex_tot.mb-0
{
  margin-bottom:15px !important;
}
.mb-0
{
  margin-bottom:0px !important;
}
.val_ref
{
  display:flex;
  align-items:center;
}
.ml-2
{
padding-left:10px !important;
}
@media only screen and (max-width:575px)
{
  .flex_sm,.flex_tot 
  {
    grid-template-columns: 100% !important;
  }
  .flex_tot.flex_to_new
  {
    grid-template-columns: 45% 45% !important;
    gap: 10%;
  }
  .flex_tot>div
  {
    // margin-top:20px !important;
  }
  // .flex_tot>div .float_right,.flex_tot .float_right>div
  // {
  //   float:unset !important;
  // }
  .just_end.flex_sm,.flex_tot .just_end,.btnh_trans.btn_end
  {
    justify-content:flex-start !important;
  }
  .flex_tot div
  {
    line-height:auto !important;
  }
  .btnh_trans
  {
    height:20px !important;
  }
  .pos_end
  {
    // position:unset !important;
    bottom:-5px !important;
  }

}
@media screen and (min-width: 852px) and (max-width: 967px)
{
  .homw_full_sec div

  {
    grid-template-columns: unset !important;
  }
}




.text_big_dash
{
  font-size:25px !important;
  font-weight:700 !important;
}
.card_sm_grey_clr div
{
  color: #868585 !important;
  font-weight:300 !important;
}
.float_right,.float_right>div
{
  float:right;
}
.text_subtitle
{
  color: #868585;
    font-size: 14px;
}
.text_warp_txt>div
{
  color:#fff !important;
  font-size:25px !important;
  font-weight:700;
  margin-bottom:20px;
}
.card_totla
{
  height:100%;
}
.mb-10
{
  margin-bottom:20px;
}
.card_sm_grey_clr
{
  margin-bottom:15px !important;
}
.card_totla.vision_card_panel
{
  margin-bottom:10px !important;
}
.flex_to_new .float_right>div
{
font-size:14px !important;
}
a[aria-label="Twitter"] svg
{
  width:16px !important;
}


.stake_row
{
  display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top:20px;
    grid-gap:0px !important;
}
.stake_card
{
  min-width: 280px !important;
    max-width: 31.5% !important;
    width: 100%;
    margin: 0px 8px 32px !important;
    box-shadow: 0px 2px 12px -8px rgb(25 19 38 / 10%), 0px 1px 1px rgb(25 19 38 / 5%);
    background-color:transparent; 
    position:relative;
  border-radius: 10px;
  grid-gap:0px !important;

}

.stake_days
{
  background-color: #2a69e2;
    border: 2px solid #2a69e2;
    color:#fff;
    padding:5px;
    border-radius:5px;
    max-width:50px;
    text-align:center;
    font-size:14px !important;
}
.flec_coind_div_new
{
  min-width: 45px;
    display: block;
}
.mt-top-end
{
  margin-top:20px;
}
.stkae_card_info
{
  padding: 22px 10px !important;
  background-image: url('/images/result_preview.png');
    background-position: bottom center !important;
    
    background-size:cover;
    border-radius:22px;
    text-align:left;
}
.card-det {
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 15px 10px;
}
.tw-800
{
  color:#fff !important;
  margin-top:10px;
}
.fam_left_txt
{
  font-size:12px !important;
}
.mb-btn-stake
{
  margin-bottom:15px;
  margin-top:15px;
}
.launc_card.mt-0
{
  margin-top:0px !important;
}
.modal_card.mt-0
{
  padding-top:0px !important;
}
.stake_card .white_box
{
  border-radius:10px !important;
}
.stake_card .card_pos
{
position:relative;
z-index:3;
}
.flex_coin_new
{
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100% !important;
}

.coin_name_title
{
  font-weight:600;
  font-size:20px;
  line-height: 1.1;
  color:#fff;
}
.fam_left_txt_sm
{
  color: #868585 !important;
  font-size:14px;
  text-align:left;
}
.mb_end
{
  margin-bottom:20px;
}
.end_Date_blue
{
  color:#2a69e2;
}
.end_card {
  padding: 10px 20px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  text-transform: uppercase;
  background-color: rgb(70, 204, 188);
}
.end_card_title
{
  color: #fff !important;
    font-size: 14px;
}
.end_Date_blue {
  color: rgb(42, 105, 226);
}
.fam_left_txt_md
{
  color: #525050 !important;
    font-size: 18px !important;
    text-align: left;
}
.fam_left_txt_xsm
{
  color: #868585 !important;
    font-size: 12px;
    text-align: left;
}
.btn_new_padding
{
padding:5px 10px !important;
cursor:pointer !important;
}
.hr_grey
{
  border-color: #807f7f;
    border-width: 1px !important;
}
.btn_new_padding:hover svg
{
  color:#000 !important;
  fill:#000 !important;
}
@media only screen and (min-width:768px)
{
  .card_heigh_fifty
  {
    height:51%;
  }
}


.h1_warp
{
  font-size: 20px;
  font-weight: 600;
    line-height: 1.1;
}
.war_des
{
  font-weight:400 !important;
}
.banner_warp_bg
{
  padding: 32px 32px 0px 32px !important;
}
.stake_card.warp_card
{
  max-width:436px !important;
}
.swap-currency-input

{
  display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 5px;
    background-color: rgb(19, 18, 18);
    z-index: 1;
    color:#fff;
}
.swap-currency-input-div
{
  border-radius: 5px;
    border: 1px solid rgba(73, 72, 72, 0.16);
    background-color: rgba(247, 244, 244, 0.07) !important;
}
.input-div-new
{
  display: flex;
  justify-content: space-between;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.75rem 1rem 0px;
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
}
.input_div_1
{
  display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    padding: 0.75rem 0.75rem 0.75rem 1rem;
}
.token-amount-input
{
  color: rgb(255, 255, 255) !important;
    width: 0px;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
}
.token-amount-input::placeholder
{
  color: rgb(255, 255, 255) !important;

}
.open-currency-select-button
{
  background: none !important;
    border: none !important;
    cursor:pointer;
}
.img_span
{
  display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.img_span img
{
  width: 24px;
    height: 24px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    border-radius: 0px;
    position:relative;
}
#pair
{
  color:#fff;
}
.img_span svg
{
  color: rgb(204, 204, 204) !important;
  fill: rgb(204, 204, 204) !important;

}

.from_to_color
{
  color: #868585;
  text-align:left;
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
  text-align:center;
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
.btn_per
{
  background-color: rgb(26, 25, 25) !important;
    border-radius: 5px !important;
    color: rgb(255, 255, 255) !important;
    border: 1px solid rgb(81, 81, 81) !important;
    height: 35px !important;
}

.btn_per:hover
{
  background-color: rgb(255, 255, 255) !important;
    border-radius: 5px !important;
    opacity: 1 !important;
    color: rgb(0, 0, 0) !important;
    border: 1px solid rgb(81, 81, 81) !important;
}
.btn-flex {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.pt-0
{
  padding-top:0px !important;
}

@media only screen and (max-width: 575px)
{
  .btn-flex button {
    padding-left: 10px !important;
    padding-right: 10px !important;
}
}

#token-search-input {
  border-radius: 5px;
  border: 1px solid rgb(81, 81, 81) !important;

  position: relative;
    display: flex;
    padding: 16px;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    background: none;
    outline: none;
    color: rgb(255, 255, 255);
    appearance: none;
    font-size: 18px;
}

.token_name_parent
{
  width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;-webkit-box-pack: justify;
    justify-content: space-between;
    margin-top:20px;
}
.token_name_txt,.token_name_symbol
{
  color: rgb(255, 255, 255);
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
}
.pair_div
{
  padding: 10px 0px;
    height: 56px;
    display: grid;
    grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
    gap: 16px;
    pointer-events: none;
    align-items:center;
}

.pair_div.inactive
{
  opacity: 0.5;

}
.float-right
{
  float:right;s
}
.pair_div img
{
  width: 24px;
    height: 24px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    border-radius: 0px;
    position:relative;
}

.pair_div_parent
{
margin-top:30px;
}
.modal_input
{
  margin-top:-20px;
}
`

export default GlobalStyle
