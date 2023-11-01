//const API_URL = "https://tormenta-codigo-app-terrible.vercel.app/api/podcast";
const API_URL = "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";

export async function fetchEpisodes() {
  try {
    const response = await fetch(API_URL);
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching the episodes:", error);
    return [];
  }
}

export function processEpisodes(episodes) {
  if (!episodes || episodes.length === 0) return;

  // Convertir duration y number a números. 
  // Poner title en caso de que no exista
  let numberTitle = 0
  episodes.forEach((ep) => {
    if (ep.hasOwnProperty('duration')){
      ep.duration = parseInt(ep.duration, 10)
    }else{
      ep.duration = 0
    }

    if (ep.hasOwnProperty('number')){
      ep.number = parseInt(ep.number, 10)
    }else{
      ep.number = 0
    }

    
    if (!ep.hasOwnProperty('title') && ep.hasOwnProperty('number')){
      ep.title = 'Title podcast ' + ep.number
    }else if(!ep.hasOwnProperty('title')){
      ep.title = 'Without title ' + numberTitle
      numberTitle++
    }
  });

  // Crear un filtro con number != 0 en episodesWithNumbers y ordenarlos
  const episodesWithNumbers = episodes.filter((ep) => ep.number !== 0)

  episodesWithNumbers.sort();


  // Calcular el siguiente episode number ... con los episodios que tienen el atributo number
  const nextEpisodeNumber = episodesWithNumbers[1].number
    //parseInt(episodesWithNumbers[episodesWithNumbers.length - 1].number, 10) + 1;

  // Calcular la suma total de duration ... con los episodios que tienen el atributo number
  const totalDuration = episodesWithNumbers.reduce((sum, ep) => sum + ep.duration, 0  );

  // Encontrar el episode más corto ... con los episodios que tienen el atributo number
  // y que tenga una duración distinta de 0
  const shortestEpisode = episodesWithNumbers.reduce(
    (shortest, ep) => (ep.duration !== 0 && ep.duration < shortest.duration ? ep : shortest),
    episodes[0]
  );

  // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
  const shuffledEpisodes = episodesWithNumbers.sort(() => Math.random() - 0.5);
  const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
  let durationSum = 0;
  const selectedTitles = [];
  for (const ep of shuffledEpisodes) {
    if (durationSum + ep.duration <= twoHourLimit ) {
      durationSum += ep.duration;
      selectedTitles.push(ep.title);
    }
  }

  // Imprimir resultados
  console.log("Next episode number:", nextEpisodeNumber);
  console.log("Total duration of all episodes:", totalDuration);
  console.log("Number of the shortest episode:", shortestEpisode.number);
  console.log("Titles below 2 hours:", selectedTitles);

  return {
    'nextEpisodeNumber': nextEpisodeNumber,
    'totalDuration': totalDuration,
    'shortestEpisode': shortestEpisode.number,
    'selectedTitles': selectedTitles
  }
}

async function main() {
  const episodes = await fetchEpisodes();
  processEpisodes(episodes);
}

main();
