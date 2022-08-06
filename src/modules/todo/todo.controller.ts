import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiAllTodoResponseType } from 'src/constants/decorators/swagger/allTodosResponse.decorator';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  @ApiAllTodoResponseType()
  getAllTodos(
    @Query('getCount', new DefaultValuePipe(false), ParseBoolPipe)
    getCount: boolean,
  ) {
    return this.todoService.getAllTodos(getCount);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post('/create')
  async createTodo(@Body() todo: Todo) {
    await this.todoService.createTodo(todo.title, todo.description);
    return true;
  }

  @Patch('/update/:id')
  async updateTodo(@Body() todo: Todo, @Param('id') id: number) {
    // this function should be able to update todo by passing one argument, not whole object
    await this.todoService.updateTodo(id, todo);
    return true;
  }

  // Never actually delete in DB, just set isDeleted to true
  @Patch('/delete')
  async deleteTodo(@Param('id') id: number) {
    await this.todoService.deleteTodo(id);
    return true;
  }
}
