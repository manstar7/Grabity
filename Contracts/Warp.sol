pragma solidity ^0.6.0;

// SPDX-License-Identifier: MIT

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    
    uint256 c = a / b;
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }

  function ceil(uint a, uint m) internal pure returns (uint r) {
    return (a + m - 1) / m * m;
  }
}

contract Owned {
    address payable public owner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address payable _newOwner) public onlyOwner {
        owner = _newOwner;
        emit OwnershipTransferred(msg.sender, _newOwner);
    }
}


interface WrapToken {
    function decimals() external view returns (uint256);
    function transfer(address to, uint256 tokens) external returns (bool success);
    function burnTokens(uint256 _amount) external;
    function balanceOf(address tokenOwner) external view returns (uint256 balance);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Wrap is Owned{
    using SafeMath for uint256;
    
    uint256 public txCount = 0;
    
    event WrappedToken(address indexed from, uint256 amountIn, uint256 txId);

    
    struct Transaction{
        address crypto;
        uint256 amountIn;
        uint256 timestamp;
    }
    
    mapping (address => mapping(uint256 => Transaction)) public _txInfo;
    
    function WrapTokens(address _crypto, uint256 _amount) public{
        require(_amount > 0 , "Value is less than Zero");
        require(WrapToken(_crypto).decimals() > 0 , "The decimals is Mismatches");
        txCount ++;
        require(WrapToken(_crypto).transferFrom(msg.sender,address(this), _amount),"Insufficient balance from User");
        _txInfo[msg.sender][txCount] = Transaction({
            crypto : _crypto,
            amountIn : _amount,
            timestamp : block.timestamp
        });  
        emit WrappedToken(msg.sender,_amount,txCount);
    }
    
     receive() external payable{
        uint256 _amount = msg.value;
        require(_amount > 0 , "Value is less than Zero");
         txCount ++;
        _txInfo[msg.sender][txCount] = Transaction({
            crypto : address(0),
            amountIn : _amount,
            timestamp : block.timestamp
        });  
        emit WrappedToken(msg.sender,_amount,txCount);
    }
    
    function withdrawBNB() public onlyOwner{
        require(address(this).balance > 0 , "No Funds Left");
         owner.transfer(address(this).balance);
    }
    
    function getCryptoBalance(address _crypto) public view returns(uint256) {
        return WrapToken(_crypto).balanceOf(address(this));
    }
    
    function withdrawCrypto(address _crypto) public onlyOwner{
        require(WrapToken(_crypto).transfer(msg.sender, WrapToken(_crypto).balanceOf(address(this))), "Insufficient balance of Wrap contract!");
    }
    
}