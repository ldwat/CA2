// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;       //As of Solidity 0.6.0, ABIEncoderV2 is no longer experimental as per https://ethereum.stackexchange.com/questions/72375/status-of-abiencoderv2-now

/*
Student:		liam.waters3@mail.dcu.ie
Program of Study: 	M.Sc. in Computing (Blockchain)
Module Code: 		CA6001I
Assignment:		Developing Blockchain Systems

The purpose of this project is to develop a Smart Contract application using the Ethereum public blockchain:
• To store securely car registration information
• Allow for the registration of car ownership
• Allow for the easy transfer of car ownership
• Prevent transfer of unvalidated ownership
*/



// Contract definition
contract CarRegTracker {
    
  //State Variables  
  uint public OwnerCount = 0;
  uint public DealerCount = 0;  
  uint public RegisterCount = 0;
  
  string UserID;
  string Pin;
  string ownerhash;
  string dealerhash;
  
  uint OHashID;
  uint DHashID;
  uint CarHashID;
 
//Structure Definition
  struct OwnerRecord {
    uint Oid;
    uint OHashID;    
    string OwnerID;    
  }
   
  struct DealerRecord {
    uint Did;
    uint DHashID;    
    string DealerID;    
  }
    
  struct CarRecord {
    uint Cid;
    string  CarID;
    uint DHashID;
    string DealerID;
    uint OHashID;
    string UserID;
  }

  mapping(uint => OwnerRecord) public Owners;
  mapping(uint => DealerRecord) public Dealers;
  mapping(uint => CarRecord) public CarRegister;
  
//Event declarations
  event OwnerCreated(
    uint Oid,
    uint OHashID,
    string OwnerID
  );

  event DealerCreated(
    uint Did,
    uint DHashID,
    string DealerID
  );
  
  event CarCreated(
    uint Cid,
    string  CarID,
    uint Did,
    string DealerID,
    uint OHashID,
    string OwnerID
  );


//Create first set of records
  constructor() public {
    createOwner("First","000");
  }


//Function definitions

//Create account for the Car owner
  function createOwner(string memory _OwnerID, string memory _OPin) public {
  
    OwnerCount ++;                                                  //Track number of accounts in solution
    ownerhash = string(abi.encodePacked(_OwnerID,_OPin));           //Combine owner name and pin into string called ownerhash
    OHashID = uint(keccak256(abi.encodePacked(ownerhash)));         //Get integer of hash of ownerhash to be used as unique record for owner
    Owners[OHashID] = OwnerRecord(OHashID, OHashID, _OwnerID);      //Put owner details at hash location in array (Only the owner will know the pin to validate record)  
        
    emit OwnerCreated(OHashID, OHashID, _OwnerID);
  }

//Create account for the Car Dealer
  function createDealer(string memory _DealerID, string memory _DPin) public {
  
    DealerCount ++;                                                         //Track number of dealers in solution
    dealerhash = string(abi.encodePacked(_DealerID,_DPin));                 //Combine dealer name and pin into string called dealerhash
    DHashID = uint(keccak256(abi.encodePacked(dealerhash)));                //Get integer of hash of dealerhash to be used as unique record for dealer
    //Dealers[DealerCount] = DealerRecord(DealerCount, DHashID, _DealerID);   //Put dealer details at hash location in array (Only the dealer will know the pin to validate record)
    Dealers[DHashID] = DealerRecord(DHashID, DHashID, _DealerID);   //Put dealer details at hash location in array (Only the dealer will know the pin to validate record)  
        
    emit DealerCreated(DHashID, DHashID, _DealerID);
  }

//Allow dealer to register a car - no owner as yet!
 function RegisterCar(string memory _DealerID, string memory _DPIN, string memory _CarID, uint _BID, string memory _BuyerID) public returns (string memory) {
  
        //confirm Dealer is legit
        dealerhash = string(abi.encodePacked(_DealerID,_DPIN));  
        DHashID = uint(keccak256(abi.encodePacked(dealerhash)));        //Get unique hash for dealer based on pin and id
        string memory g_UserID = Dealers[DHashID].DealerID;             //Get id of the dealer at the point in the array

        if (keccak256(abi.encodePacked(_DealerID)) == keccak256(abi.encodePacked(g_UserID))) {  // use to compare user id string values - use hash of strings to prevent loading stringutils

            //confirm buyer exits
            uint  b_HashID = Owners[_BID].OHashID;                                                                          //find buyerhash
            string memory b_BuyerID = Owners[_BID].OwnerID;
             
                if (keccak256(abi.encodePacked(b_BuyerID)) == keccak256(abi.encodePacked(_BuyerID)))  {                     // use to compare string values to prevent loading stringutils

                    CarHashID = uint(keccak256(abi.encodePacked(_CarID)));                                                   //hash of car reg to place in array
 
                    if (CarRegister[CarHashID].DHashID ==0){                                                                    //verify there is not already have a record at this point in the array
                            RegisterCount ++;  
                            CarRegister[CarHashID] = CarRecord(CarHashID, _CarID, DHashID, _DealerID, b_HashID, b_BuyerID);  //place Car registration details into the array
                            emit CarCreated(CarHashID, _CarID, DHashID, _DealerID, b_HashID, b_BuyerID);   
                            return "Car successfully registered!";

                    } else { return "Car already registered."; }
            
                }    else { return "Car ownership not changed. Buyer details incorrect."; }   
    
        } else{ return "Car not registered. Dealer details incorrect."; }
  
  }

//Set Car Owner
 function ChangeCarOwner(string memory _OwnerID, string memory _OPIN, string memory _CarID, uint _BID, string memory _BuyerID) public returns (string memory) {
  
        //Confirm Car record exists
        CarHashID = uint(keccak256(abi.encodePacked(_CarID)));                                                   //hash of car reg to place in array
        string memory c_CarID = CarRegister[CarHashID].CarID;                                                    //get id of car at this point in the array
        
        if (keccak256(abi.encodePacked(c_CarID)) == keccak256(abi.encodePacked(_CarID))) {                      //compare id in array to that supplied
            
          //confirm Owner of car's credentials *****************
                ownerhash = string(abi.encodePacked(_OwnerID,_OPIN));       //concatonate pin and id
                OHashID = uint(keccak256(abi.encodePacked(ownerhash)));        //Get unique hash for owner based on pin and id
                string memory o_OwnerID = Owners[OHashID].OwnerID;          //get owner id at this hash point

                //check owner id's match and owner is that of the car i.e. they are allowed sell the car
                if ((keccak256(abi.encodePacked(_OwnerID)) == keccak256(abi.encodePacked(o_OwnerID))) && (CarRegister[CarHashID].OHashID ==  OHashID)) {  
                    
                    //confirm buyer is at this hash point
                    string memory b_BuyerID = Owners[_BID].OwnerID;         //get buyers id at the hash point provided
                    
                    if (keccak256(abi.encodePacked(b_BuyerID)) == keccak256(abi.encodePacked(_BuyerID)))  {  //check buyers id's match to ensure sell car to the correct person
                            
                            //Change Car Ownership
                            uint _DID = CarRegister[CarHashID].DHashID;             //retain dealer details
                            string memory _DealerID = CarRegister[CarHashID].DealerID;
                            CarRegister[CarHashID] = CarRecord(CarHashID, _CarID, _DID, _DealerID, _BID, b_BuyerID);
                            return "Car successfully changed!";
                            
                        } else { return "Car ownership not changed. Buyer details incorrect."; }
      
                    } else { return "Car ownership not changed. Owner details incorrect."; }
                    
        }  else { return "Car ownership not changed. Car details incorrect."; }
}


}