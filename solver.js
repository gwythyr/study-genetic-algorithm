const { getRandomGene } = require('./genes');

module.exports = class Solver {
    genes = [];
    constructor(parent1, parent2) {
        if (parent1 && parent2) {
            for (let i = 0; i < parent1.genes.length; i++) {
                this.genes.push(Math.random() > 0.5 ? parent1.genes[i]: parent2.genes[i])
            }
        } else {
            for (let i = 0; i < 15; i++) {
                this.genes.push(getRandomGene())
            }
        }
    }

    mutate() {
        const index = Math.floor(Math.random() * this.genes.length);
        this.genes[index] = getRandomGene();
    }

    getRoot(number) {
        for (const gen of this.genes) {
            number = gen(number);
        }
        return number;
    }
}
