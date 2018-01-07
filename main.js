const SHA256 = require('crypto-js/sha256');

class Block {
  constructor (index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  calculateHash () {
    return SHA256(this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce).toString();
  }
  mineBlock (difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0))
    {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined:', this.hash);
  }
}

class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock () {
    return new Block(0, '01/01/2018', "Genesis Block", "0");
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  addBlock (newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid () {
    for (let i = 1; i < this.chain.length; i++)
    {
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash())
      {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash)
      {
        return false;
      }
    }
    return true;
  }
}

let suwiCoin = new Blockchain();

//PART 1  BASIC BLOCK CHAIN UNCOMMENT TO SEE BASIC BLOCK CHAIN AND CHAIN VALIDITY
// suwiCoin.addBlock(new Block(1, "10/05/2018", { amount: 5 }));
// suwiCoin.addBlock(new Block(2, "12/05/2018", { amount: 15 }));

// //Check if our chain is valid
// console.log('Is block chain valid?', suwiCoin.isChainValid());

// suwiCoin.chain[1].data = { amount: 100 };
// //Check if our chain is valid after mutation
// console.log('Is block chain valid?', suwiCoin.isChainValid());


//PART 2 PROOF OF WORK PROVES THE BLOCK CAN BE ADDED ONLY AFTER SIGNIFICANT WORK
console.log('Mining First Block');
suwiCoin.addBlock(new Block(1, "10/05/2018", { amount: 5 }));

console.log('Mining Second Block');
suwiCoin.addBlock(new Block(2, "12/05/2018", { amount: 15 }));

