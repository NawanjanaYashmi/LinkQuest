import { Location, DistanceMatrix } from '../Algorithm/types';

export const findShortestRoute = (distances: DistanceMatrix, locations: Location[]) => {
  const numCities = distances.rows.length;
  const alpha = 1; 
  const beta = 2; 
  const evaporationRate = 0.5;
  const numAnts = numCities;
  const numIterations = 100;

  let pheromones = Array(numCities).fill(null).map(() => Array(numCities).fill(1));
  let bestRoute: number[] = [];
  let bestDistance = Infinity;

  for (let iteration = 0; iteration < numIterations; iteration++) {
    let routes: number[][] = [];
    let distancesTravelled: number[] = [];

    for (let ant = 0; ant < numAnts; ant++) {
      let route = [Math.floor(Math.random() * numCities)];
      while (route.length < numCities) {
        let currentCity = route[route.length - 1];
        let probabilities = pheromones[currentCity].map((pheromone, i) => {
          if (route.includes(i)) return 0;
          return Math.pow(pheromone, alpha) * Math.pow(1 / distances.rows[currentCity].elements[i].distance.value, beta);
        });
        let sum = probabilities.reduce((a, b) => a + b, 0);
        let normalizedProbabilities = probabilities.map(p => p / sum);
        let nextCity = weightedRandomChoice(normalizedProbabilities);
        route.push(nextCity);
      }

      let routeDistance = route.reduce((sum, city, i) => {
        if (i === route.length - 1) return sum + distances.rows[city].elements[route[0]].distance.value;
        return sum + distances.rows[city].elements[route[i + 1]].distance.value;
      }, 0);

      if (routeDistance < bestDistance) {
        bestDistance = routeDistance;
        bestRoute = route;
      }

      routes.push(route);
      distancesTravelled.push(routeDistance);
    }

    pheromones = pheromones.map((row, i) => row.map((_, j) => {
      let pheromone = row[j] * (1 - evaporationRate);
      routes.forEach((route, k) => {
        if (route.includes(i) && route.includes(j)) {
          pheromone += 1 / distancesTravelled[k];
        }
      });
      return pheromone;
    }));
  }

  const routeCoords = bestRoute.map(index => locations[index].coordinate);

  return {
    origin: routeCoords[0],
    destination: routeCoords[bestRoute.length - 1],
    waypoints: routeCoords.slice(1, -1)
  };
};

const weightedRandomChoice = (weights: number[]) => {
  let total = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) return i;
    random -= weights[i];
  }
  return weights.length - 1;
};