pragma solidity^0.4.22;
contract game{
    uint playerBid;
    uint playerPayout = 0;
    uint devPayout = 0;
    uint charityPayout = 0;
    uint playerSeed;
    address playerAddress;
    address devAddress;
    address charityAddress;
    uint winMultiplier = 120;//includes two decimals out
    
    constructor(address charity, uint seed)
    public
    payable
    {
        devAddress = 0xF5e494ea47FA500D5d4ABf2d6270A4F18aa44875;//TODO: hardcode address
        charityAddress = charity;
        playerAddress = msg.sender;
        playerBid = msg.value * 100;
        playerSeed = seed;
        playGame();
    }
    
    //playGame
    //Consumes: playerBid and playerSeed, to decide winner
    //Produces: nothing
    //side effects: modifies values of all payouts
    function playGame()
    public
    payable
    returns (bool) {
        bool winState = false;
        if(playerSeed % 100 < 45){
            winState = true;
        }
        
        if(winState && address(this).balance >= (playerBid * winMultiplier) ){
            charityPayout = 0;
            devPayout = 0;
            playerPayout = (playerBid * winMultiplier)/100;
        } else {
            uint devWithholding = 5;//includes two decimals out
            charityPayout = (playerBid * (100 - devWithholding)) / 100;
            devPayout = (playerBid * devWithholding)/100;
            playerPayout = 0;
        }
        payout();
        return winState;
    }
    
    //payout
    //Consumes: the payouts and addresses of each userSeed
    //Produces: true if success, false otherwise
    //side effects: pays balances out to each user, transfering funds
    function payout()
    payable
    public
    returns (bool) {
        if(playerAddress.send(playerPayout) && charityAddress.send(charityPayout) && devAddress.send(devPayout)){
            return true;
        } else{
            return false;
        }
    }
    
}