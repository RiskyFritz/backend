import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log(filterDto);
    return this.TasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.TasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.TasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    return this.TasksService.updateTaskStatus(id, status);
  }
}
