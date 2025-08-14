import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from '../auth/entities/user.entity';
import { Unit } from './entities/unit.enum';

describe('RecipeService', () => {
  let service: RecipeService;
  let mockRepository: jest.Mocked<Repository<Recipe>>;

  const mockUser: User = {
    id: 'user-1',
    email: 'test@example.com',
    password: 'hashedPassword',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    avatar: null,
    createdAt: new Date(),
    recipes: [],
    hashPassword: jest.fn(),
    validatePassword: jest.fn(),
  };

  const mockRecipe: Recipe = {
    id: 'recipe-1',
    title: 'Test Recipe',
    content: 'Test content',
    ingredients: [
      {
        name: 'Flour',
        amount: 100,
        unit: Unit.GRAM,
      },
    ],
    author: mockUser,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    mockRepository = module.get(getRepositoryToken(Recipe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const createRecipeDto: CreateRecipeDto = {
        title: 'Test Recipe',
        content: 'Test content',
        ingredients: [
          {
            name: 'Flour',
            amount: 100,
            unit: Unit.GRAM,
          },
        ],
      };

      mockRepository.create.mockReturnValue(mockRecipe);
      mockRepository.save.mockResolvedValue(mockRecipe);

      const result = await service.create(createRecipeDto, mockUser);

      expect(result).toEqual(mockRecipe);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createRecipeDto,
        author: mockUser,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockRecipe);
    });
  });
});
