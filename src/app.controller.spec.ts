import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppModule } from "./app.module";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("getAllTasks", () => {
    it("should return an array of tasks", () => {
      const tasks = appController.getAllTasks();
      expect(Array.isArray(tasks)).toBe(true);
    });
  });

  describe("createTask", () => {
    it("should create a new task", () => {
      const taskData = { content: "New Task", done: false };
      const message = appController.createTask(taskData);
      expect(message).toBe("Task created successfully");
    });
  });

  describe("deleteTask", () => {
    it("should delete an existing task", () => {
      appController.createTask({ content: "Test Task", done: false });

      const tasks = appController.getAllTasks();
      const taskId = tasks.find((task) => task.content === "Test Task")?.id;

      const message = appController.deleteTask(taskId.toString());
      expect(message).toBe(`Task with ID ${taskId} deleted successfully`);
    });

    it("should handle deleting a non-existent task", () => {
      const nonExistentTaskId = "9999";
      expect(() => appController.deleteTask(nonExistentTaskId)).toThrowError(
        "Task with ID 9999 not found"
      );
    });
  });

  describe("updateTask", () => {
    it("should update an existing task", () => {
      appController.createTask({ content: "Test Task", done: false });

      const tasks = appController.getAllTasks();
      const taskId = tasks.find((task) => task.content === "Test Task")?.id;

      const updatedTaskData = { content: "Updated Task", done: true };
      const message = appController.updateTask(
        taskId.toString(),
        updatedTaskData
      );
      expect(message).toBe(`Task with ID ${taskId} updated successfully`);

      const updatedTask = tasks.find((task) => task.id === taskId);
      expect(updatedTask?.content).toBe("Updated Task");
      expect(updatedTask?.done).toBe(true);
    });

    it("should handle updating a non-existent task", () => {
      const nonExistentTaskId = "9999";
      const updatedTaskData = { content: "Updated Task", done: true };
      expect(() =>
        appController.updateTask(nonExistentTaskId, updatedTaskData)
      ).toThrowError("Task with ID 9999 not found");
    });
  });
});
