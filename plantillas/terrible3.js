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


 
  // Calcular media de duration de todos los episodios que dispongan el atributo duration
  let sumaDuration = 0
  let EpisodesWithDuration = 0

  episodes.forEach((ep) => {
    if(ep.hasOwnProperty('duration')){
      sumaDuration =+ parseInt(ep.duration, 10)
      EpisodesWithDuration++
    }else if (!ep.hasOwnProperty('duration') && ep.hasOwnProperty('supercoco')){
      ep.duration = ep.supercoco
    }
  })

  let mediaDuration = 0
  if (EpisodesWithDuration !== 0){
    //console.log('sumaDuration', sumaDuration, 'EpisodesWithDuration', EpisodesWithDuration)
    mediaDuration = sumaDuration / EpisodesWithDuration
  }

  // Creo array para los números de los episodios que existen
  let numberEpisodeExist = []

  // Convertir duration a números y si no tiene duraton les añado la media
  // Insertar en el array numberEpisodeExist los episodios que tengan el atributo number
  episodes.forEach((ep) => {
    if (!ep.hasOwnProperty('duration')){
      ep['duration'] = mediaDuration
    }else{
      ep.duration = parseInt(ep.duration, 10)
    }

    if(ep.hasOwnProperty('number')){
      ep.number = parseInt(ep.number, 10)
      numberEpisodeExist.push(ep.number)
    }else{
      ep.number = 0
    }

    /* let numberTitle = 0
    if (!ep.hasOwnProperty('title') && ep.hasOwnProperty('number')){
      ep.title = 'Title podcast ' + ep.number
    }else if(!ep.hasOwnProperty('title')){
      ep.title = 'Without title ' + numberTitle
      numberTitle++
    } */
  });

  //console.log('episodes', episodes)

  // Ordeno el array de números (de menor a mayor)
  numberEpisodeExist.sort()
  //console.log('numberEpisodeExist antes:',numberEpisodeExist)
  
  episodes.forEach((ep) =>{
    if(ep.number === 0){
      ep.number = nextNumberEpisodeFree(numberEpisodeExist)
      numberEpisodeExist.push(parseInt(ep.number, 10))
      numberEpisodeExist.sort()
    }

    if (!ep.hasOwnProperty('title') && ep.hasOwnProperty('number')){
      ep.title = 'Title podcast ' + ep.number
    }
  })

  console.log('episodes', episodes)
  
  //console.log('numberEpisodeExist despues:',numberEpisodeExist)

  // Ordeno los number y si no lo tiene, se lo añado con los números que faltan entre medias
  episodes.sort((a, b) =>  parseInt(a.number, 10) - parseInt(b.number, 10))

  //console.log(episodes)

  // Calcular el siguiente episode number
  const nextEpisodeNumber = parseInt(episodes[episodes.length - 1].number, 10) + 1;
  
  // Calcular la suma total de duration
  const totalDuration = episodes.reduce((sum, ep) => sum + ep.duration, 0);

  // Encontrar el episode más corto
  const shortestEpisode = episodes.reduce(
    (shortest, ep) => (ep.duration < shortest.duration ? ep : shortest),
    episodes[0]
  );

  // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
  const shuffledEpisodes = episodes.sort(() => Math.random() - 0.5);
  const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
  let durationSum = 0;
  const selectedTitles = [];
  for (const ep of shuffledEpisodes) {
    if (durationSum + ep.duration <= twoHourLimit) {
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

function nextNumberEpisodeFree(numberEpisodeExist){

  var myNumber = 0;
  for(let i = 0; i < numberEpisodeExist.length; i++){

    if (i === 0){
      myNumber = numberEpisodeExist[i]
    }else{
      myNumber++
      if(!numberEpisodeExist.includes(myNumber)){
        return myNumber
      }
    }
   
  } 

}

async function main() {
  const episodes = await fetchEpisodes();
  processEpisodes(episodes);
}

main();
