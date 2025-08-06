import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from 'nestjsx-automapper';

@Entity()
export class UserDto {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  firstName: string;
  @Column()
  @AutoMap()
  lastName: string;
}
