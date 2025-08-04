import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Ingredient } from './ingredient.embedded';
import { User } from './user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb' })
  ingredients: Ingredient[];

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
