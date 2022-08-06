import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @IsString()
  @IsDefined()
  @Length(3, 50)
  @ApiProperty({
    example: 'Take out the trash',
  })
  public title: string;

  @Column()
  @IsString()
  @IsDefined()
  @ApiProperty({
    example: 'Take out the trash today',
  })
  public description: string;

  @Column({
    default: false,
  })
  @ApiProperty()
  public completed: boolean;

  @Column({
    default: false,
  })
  @ApiProperty()
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt: Date;
}
