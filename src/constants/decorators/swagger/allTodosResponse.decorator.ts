import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Todo } from 'src/modules/todo/todo.entity';

export const ApiAllTodoResponseType = () => {
  return applyDecorators(
    ApiOperation({
      description: 'All todos response',
    }),
    ApiQuery({
      name: 'getCount',
      description: 'Get count of todos (optional query)',
      type: 'boolean',
      required: false,
    }),
    ApiOkResponse({
      description: 'All todos response',
      status: 200,
      schema: {
        $ref: getSchemaPath(Todo),
        example: [
          {
            todos: [
              {
                id: 2,
                title: 'Take out the trash',
                description: 'Take out the trash today',
                completed: false,
                isDeleted: false,
                createdAt: '2022-08-06T09:14:30.689Z',
                updatedAt: '2022-08-06T09:14:30.689Z',
              },
            ],
            count: 1,
          },
        ],
      },
    }),
  );
};
