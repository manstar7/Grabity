# Grabity
A Defi with Centralised Bridge

# Installation

1. yarn to install dependencies and copy paste the @pancakelibs-uikit to the nodemodules 
2. use yarn start to test
3. To Depoly the the module , change the env variables to CHAIN_ID and RPC_URL

# Exchange Contracts

1. First deploy the FACTORY, from the pair Hash code we can go for the Router
2. After deploying the Router and copy the post address 
3. With that we can proceed with the Pancake-SDK, just create a build dist and replace in node modules/@pancakelibs/sdk of Swap-Interface
4. you can move the build files to live

# Farms and Pools

1. Deploy the GrabityFarms Contarct
2. with the admin panel you can create new farms and pools

