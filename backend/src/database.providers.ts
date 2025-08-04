import { DataSource } from 'typeorm';
import { User } from './test/user.entity';
import { Recipe } from './test/recipe.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '142434',
        database: 'postgres',
        entities: [User, Recipe],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
