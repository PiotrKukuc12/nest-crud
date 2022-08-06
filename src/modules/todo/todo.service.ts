import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  public async getAllTodos(getCount) {
    const todos = await this.todoRepository.find({
      where: {
        isDeleted: false,
      },
    });
    if (getCount) {
      const count = await this.todoRepository.count();
      return { todos, count };
    }
    return { todos };
  }

  public async getTodoById(id: any) {
    const todo = await this.todoRepository.findOne({
      where: {
        isDeleted: false,
        id,
      },
    });

    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  public async getTodoByTitle(title: any) {
    const todo = await this.todoRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });

    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  public async createTodo(title: any, description: any) {
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    await this.todoRepository.save(todo);
    return todo;
  }

  public async updateTodo(id, todo) {
    console.log('iid', id);

    // Not sure about two calls to db, to make sure that todo exist
    // could be done with one sql call i guess
    const todoEntity = await this.todoRepository.findOne({
      where: {
        id,
      },
    });

    if (!todoEntity) throw new NotFoundException('Todo not found');

    await this.todoRepository.update(todoEntity.id, todo).catch((error) => {
      console.log('Error occured while updating:', error);
      throw new ServiceUnavailableException('Unknown error occured');
    });
  }

  public async deleteTodo(id) {
    await this.todoRepository
      .update(id, {
        isDeleted: true,
      })
      .catch((error) => {
        console.log('Error occured while deleting:', error);
        throw new ServiceUnavailableException('Unknown error occured');
      });
  }
}
