/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiResponse, ApiQuery, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';


@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @ApiResponse({status: 200, description: 'Movie data'})
    @ApiBadRequestResponse({description: "Error fetching movies"})
    @ApiNotFoundResponse({description: 'No page ... or the movie ... do not exist'})
    @ApiQuery({ name: 'page', required: false, example: '2' })
    @ApiQuery({ name: 'search', required: false, example: 'Harry Potter' })
    @Get()
    async getAllMovies(@Query('search') search: string | null, @Query('page') page: number | null): Promise<any> {
        return this.moviesService.getAllMovies(search, page);
    }

    @ApiResponse({status: 200, description: 'Movie data'})
    @ApiBadRequestResponse({description: 'Error fetching movie'})
    @ApiNotFoundResponse({description: 'Movie with ID ... not found'})
    @Get(':id')
    async getMovieById(@Param('id') id: number): Promise<any> {
        return this.moviesService.getMovieById(id);
    }


}
