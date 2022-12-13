const Solver = require('./solver');
const { genesRepresentation } = require('./genes')

const POPULATION_SIZE = 1000;
const GENERATIONS = 10000;
const cases = [2, 3, 45, 365, 25365, 3456234, 34523453996, 54676345234534];

function initPopulation() {
    const population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        population.push(new Solver());
    }
    return population;
}

function calculateFitness(solver, number) {
    const expected = Math.sqrt(number);
    const result = solver.getRoot(number);
    const difference = result - expected;
    return Math.abs(difference / expected);
}

function getBestSolvers(population) {
    const solversWithFitness = population.map(
        solver => ({
            fitness: cases.reduce((score, number) => score + calculateFitness(solver, number), 0),
            solver
        })
    );
    solversWithFitness.sort((s1, s2) => s1.fitness - s2.fitness);
    return [solversWithFitness.slice(0, POPULATION_SIZE * 0.1).map(s => s.solver), solversWithFitness[0].fitness];
}

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function createNewPopulationFromBestSolvers(bestSolvers) {
    const children = [];
    for (let i = 0; i < POPULATION_SIZE * 0.9; i++) {
        const parent1 = getRandomArrayElement(bestSolvers);
        let parent2;
        while (parent1 === parent2) {
            parent2 = getRandomArrayElement(bestSolvers);
        }
        children.push(new Solver(parent1, parent2))
    }
    for (let i = 0; i < POPULATION_SIZE * 0.01; i++) {
        getRandomArrayElement(children).mutate();
    }
    return [...bestSolvers, ...children];
}

function runPopulationAlgorithm() {
    let population = initPopulation();
    let currentFitness = Number.MAX_VALUE;
    let bestSolver;
    for (let generation = 0; generation < GENERATIONS; generation++) {
        const [bestSolvers, topFitness] = getBestSolvers(population);
        bestSolver = bestSolvers[0];
        if (topFitness < currentFitness) {
            currentFitness = topFitness;
            console.log(`Top fitness result: ${currentFitness}, generation: ${generation}`);
        }
        population = createNewPopulationFromBestSolvers(bestSolvers);
    }
    console.log(`Best flow: ${bestSolver.genes.map(gen => genesRepresentation[gen]).join(" ")}`);
}

runPopulationAlgorithm()
