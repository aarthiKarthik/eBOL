pragma solidity ^0.4.24;

//author atkn


import "./ownable.sol";
//import "./erc721.sol";
//import "./safemath.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
//import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract BoL is Ownable, ERC721 {
    
    using SafeMath for uint256;
    
    struct BoLStruct{
        string nameId;
        string sName;        //Shipper name
        string consignee;    //Consignee name
        string itemDesc;     //Item description
        address owner;       //Owner of shipment
        uint256 qty;         //Quantity of goods
    }
    
    uint256 private count = 0;
    
    BoLStruct public bol;

    constructor ()
    ERC721() public {
        owner = msg.sender;
    }

    /*constructor() ERC721() public {
        owner = msg.sender;
    }*/

    //only one BoL can be created, for now    
    function mintToken(string shipperName, string consignee, uint256 qty) public onlyOwner{
        require(count < 1, "Cant create more");

        bol.nameId = "MAERSK BoL";
        bol.sName = shipperName;
        bol.consignee = consignee;
        bol.owner = msg.sender;
        bol.qty = qty;
        count = count.add(1);
        emit Mint(msg.sender,_to,_tokenId);
    }
    
    
    //function to sell tajmahal
    //function buyTajmahal() public payable {
    //    require(msg.value == tajmahal.price * 10**18);
    //    tajmahal.owner = msg.sender;
    //}
    
    //function setTajmahalPrice(uint _prc) public {
    //    require(msg.sender == tajmahal.owner);
    //    tajmahal.price = _prc;
    //} 
    
    function withdraw() external onlyOwner {
    	owner.transfer(address(this).balance);
    }
  
    function balanceOf(address _owner) public view returns (uint256 _balance){
      	return 1;
    } 
  
    function ownerOf(uint256 _tokenId) public view returns (address _owner){
      	return bol.owner;
    }
  
    function transfer(address _to, uint256 _tokenId) public{
      	require( msg.sender == bol.owner );
      	bol.owner = _to;
      	emit Transfer(msg.sender,_to,_tokenId);
    }
  
    //no implementation added 
    function approve(address _to, uint256 _tokenId) public{ 
    }
  
    //no implementation added
    function takeOwnership(uint256 _tokenId) public {
    }
}
