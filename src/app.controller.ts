import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from "@nestjs/common";

@Controller("tasks")
export class AppController {
  private tasks = [
    { id: 1, content: "Task 1", done: false },
    { id: 2, content: "Task 2", done: true },
  ];

  private currentId = 3;

  @Get()
  getAllTasks(): any[] {
    return this.tasks;
  }

  @Post()
  createTask(@Body() taskData: { content: string; done: boolean }): string {
    const newTask = { id: this.currentId++, ...taskData };
    this.tasks.push(newTask);
    return "Task created successfully";
  }

  @Delete(":id")
  deleteTask(@Param("id") taskId: string): string {
    const index = this.tasks.findIndex(
      (task) => task.id === parseInt(taskId, 10)
    );

    if (index !== -1) {
      this.tasks.splice(index, 1);
      return `Task with ID ${taskId} deleted successfully`;
    } else {
      throw new Error(`Task with ID ${taskId} not found`);
    }
  }

  @Patch(":id")
  updateTask(
    @Param("id") taskId: string,
    @Body() taskData: { content: string; done: boolean }
  ): string {
    const index = this.tasks.findIndex(
      (task) => task.id === parseInt(taskId, 10)
    );

    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...taskData };
      return `Task with ID ${taskId} updated successfully`;
    } else {
      throw new Error(`Task with ID ${taskId} not found`);
    }
  }
}
