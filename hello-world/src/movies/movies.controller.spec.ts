/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const mockMoviesService = {
      getAllMovies: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return a list of movies', async () => {
      const mockMovies = { results: [{ title: 'Movie 1' }, { title: 'Movie 2' }] };
      jest.spyOn(service, 'getAllMovies').mockResolvedValue(mockMovies);

      const result = await controller.getAllMovies(null, 1);
      expect(result).toEqual(mockMovies);
    });

    it('should return a filtered list of movies when searching', async () => {
      const mockMovies = { results: [{ title: 'Inception' }] };
      jest.spyOn(service, 'getAllMovies').mockResolvedValue(mockMovies);

      const result = await controller.getAllMovies('Inception', 1);
      expect(result).toEqual(mockMovies);
    });

    it('should throw NotFoundException when no movies are found', async () => {
      jest.spyOn(service, 'getAllMovies').mockRejectedValue(new NotFoundException('Movie not found'));

      await expect(controller.getAllMovies('NonExistentMovie', 1)).rejects.toThrow(NotFoundException);
    });
  });
});

