const genes = [
    n => n/2,
    n => n/3,
    n => n*2,
    n => n*3,
    Math.abs,
    n => n % 2,
    n => n % 3,
];

module.exports = {
    getRandomGene() {
        return genes[Math.floor(Math.random() * genes.length)]
    },
    genesRepresentation: {
        [genes[0]]: '/ 2',
        [genes[1]]: '/ 3',
        [genes[2]]: '* 2',
        [genes[3]]: '* 3',
        [genes[4]]: 'mod',
        [genes[5]]: '% 2',
        [genes[6]]: '% 3',
    }
}
