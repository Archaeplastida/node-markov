/** Tests for MarkovMachine */

const MarkovMachine = require("./markov");

markovObj = new MarkovMachine("the cat in the hat is in the hat");

describe("cls.makeChains() function", function () {

    test("Returns the correct words/properties", function () {
        let listOfProperties = ["the", "cat", "in", "hat", "is"];

        for (let property of listOfProperties) {
            expect(markovObj.chains).toHaveProperty(property);
        }

        expect(markovObj.chains).not.toHaveProperty("nonexistent");
    })

    test("Returns the correct chain", function () {
        expect(markovObj.chains).toEqual({
            the: ['cat', 'hat', 'hat'],
            cat: ['in'],
            in: ['the', 'the'],
            hat: ['is', null],
            is: ['in']
        })
    })
})

describe("cls.makeText() function", function () {

    test("Returns a string that isn't empty", function () {
        expect(markovObj.makeText()).toEqual(expect.any(String));
    })

    test("Returns correct set of words / not having words which aren't included", function () {
        expect(markovObj.makeText()).toMatch(/(the|cat|in|hat|is)/);
        expect(markovObj.makeText()).not.toMatch(/(nonexistent|things|on|this)/);
    })

})