/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";

@Injectable()
export class MoviesService {

    async getAllMovies(search: string | null, page: number | null): Promise<any> {
      try {
            let url: string = '';

            if(search){
                if(page) {
                    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(search)}&page=${page}`
                }
                else {
                    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(search)}`
                }
            }
            else {
                if(page) {
                    url = `https://api.themoviedb.org/3/movie/popular?page=${page}`
                }
                else {
                    url = `https://api.themoviedb.org/3/movie/popular`
                }
            }

           
            const movies = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
            }})  ;

            if(movies.statusText !== 'OK') {
                throw new BadRequestException('Error fetching movies');
            }

            const moviesJson = await movies.json();

            if(page !== null && moviesJson.total_pages < page) {
                throw new NotFoundException(`No page ${page}`)
            }

            if(search !== null && moviesJson.total_results === 0){
                throw new NotFoundException(`The movie ${search} don't exist`)
            }

            return moviesJson;

        }
        catch (error) {
            console.error(error)
        }
     
    }

    async getMovieById(id: number): Promise<any> {

        try {
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
                }});
    
            if(movie.statusText !== 'OK') {
                throw new BadRequestException(`Error fetching movie with id ${id}`);
            }

            if(!movie) {
                throw new NotFoundException(`Movie with id ${id} not found`)
            }
    
            const movieJson = await movie.json();

            return movieJson
        } catch (error) {
            console.error(error)
        }
       
    }
}