/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = this.chains;
    let idx = 0;

    for (let word of this.words) {
      if (!chains[word]) chains[word] = []; // if the word doesn't exist in the chain itself, add it.
      if (!idx) { idx++; continue }; // if the id is equal to zero, then skip this iteration as index 0 is the first index, therefore having nothing before it.
      chains[this.words[idx - 1]].push(word); // this adds the current word in an array, which is associated with the word behind it. (This won't work for index 0, since it's the first.)
      idx++;
    }

    chains[this.words[this.words.length - 1]].push(null);
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let stringOfText = "";

    let chosenWord = this.words[Math.floor(Math.random() * this.words.length)]

    for (let i = 0; i < numWords; i++) {
      stringOfText = stringOfText + " " + chosenWord; //add the word into stringOfText
      let chooseWordFromChain = this.chains[chosenWord];
      chosenWord = chooseWordFromChain[Math.floor(Math.random() * chooseWordFromChain.length)];
      if (!chosenWord) break;
    }
    return stringOfText;
  }
}

module.exports = {
  MarkovMachine
}