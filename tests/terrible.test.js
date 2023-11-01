//import { fetchEpisodes, processEpisodes, } from '../plantillas/terrible'
//import { fetchEpisodes, processEpisodes, } from '../plantillas/terrible2'
import { fetchEpisodes, processEpisodes, } from '../plantillas/terrible3'
import { expect, test } from 'vitest'

const episodies = await fetchEpisodes()
console.log('DATOS DE ARCHIVO TEST terrible.js')
const result = processEpisodes(episodies)
console.log('result : ', result)

test('lenght correct object', ()=>{

    expect(episodies).toHaveLength(48);
})

test('Not exist attribute SUPERCOCO', ()=>{

    episodies.forEach(element => {
        expect(element).not.toHaveProperty('supercoco')      
    });   
})


test('exist attribute duration', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('duration')      
    });   
})

test('exist attribute number', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('number')      
    });
})

test('exist attribute title', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('title')      
    });      
})

test('exist attribute excerpt', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('excerpt')      
    });   
})

test('exist attribute published_at', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('published_at')      
    });    
})

test('exist attribute id', ()=>{

    episodies.forEach(element => {
        expect(element).toHaveProperty('id')      
    });    
})

test('Is there next episode?', ()=>{
    expect(result.nextEpisodeNumber).not.toBeNaN()
})

test('totalDuration?', ()=>{

    expect(result.totalDuration).not.toBeNaN()
})

test('shortestEpisode?', ()=>{

    expect(result.shortestEpisode).not.toBeUndefined()
})

test('selectedTitles without undefined?', ()=>{

    expect(result.selectedTitles).not.toContain(undefined)
})

test('selectedTitles distinct to zero?', ()=>{

    expect(result.selectedTitles).not.toHaveLength(0)
})

