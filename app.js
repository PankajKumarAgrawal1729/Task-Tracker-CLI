const readline = require("readline/promises");
const fs = require("fs").promises;

const TASK_FILE = "task.json";
const StatusType = {
  todo: "TODO",
  "in-progress": "IN-PROGRESS",
  done: "DONE",
};

async function start() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let ops = await rl.question("Enter Your Task: ");
  let taskInfo = ops.split(" ");
  if (ops.indexOf("add") !== -1) {
    console.log(ops.split(" "));
    addTask(ops.substring(ops.indexOf('"')));
  } else if (ops.indexOf("update") !== -1) {
    updateTaskDescription(taskInfo[1], ops.substring(ops.indexOf('"')));
  } else if (ops.indexOf("list") !== -1) {
    const statusFilter = taskInfo.length > 1 ? taskInfo[1] : "all";
    printFileData(statusFilter);
  } else if (ops.indexOf("delete") !== -1) {
    deleteTask(taskInfo[1]);
  } else if (ops.indexOf("mark") !== -1) {
    updateTaskStatus(
      taskInfo[0].substring(taskInfo[0].indexOf("-") + 1),
      taskInfo[1]
    );
  }
  rl.close();
}

async function getNextId() {
  const taskdata = await getFileTasks();
  if (taskdata.length === 0) {
    return 1;
  }
  return Math.max(...taskdata.map((task) => task.id)) + 1;
}

async function addTask(desc) {
  try {
    const time = new Date().toLocaleString();
    const id = await getNextId();
    const task = {
      id: id,
      description: desc,
      status: StatusType["todo"],
      createdAt: time,
      updatedAt: time,
    };
    let tasksList = await getFileTasks();
    tasksList.push(task);
    const updatedJsonString = JSON.stringify(tasksList, null, 2);
    await fs.writeFile(TASK_FILE, updatedJsonString, "utf-8");
    console.log(`Task added successfully (ID: ${id})`);
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
}

async function updateTaskDescription(id, desc) {
  try {
    const tasks = await getFileTasks();
    let task = tasks.find((task) => task.id == id);
    if (task) {
      task.description = desc;
      task.updatedAt = new Date().toLocaleString();
      const updatedJsonString = JSON.stringify(tasks, null, 2);
      await fs.writeFile(TASK_FILE, updatedJsonString, "utf-8");
      console.log(`Task Updated Successfully`);
    } else {
      console.log(`User with ID ${id} not found.`);
    }
  } catch (error) {
    console.error("An error occurred during JSON file update:", error.message);
  }
}
async function updateTaskStatus(status, id) {
  try {
    const tasks = await getFileTasks();
    let task = tasks.find((task) => task.id == id);
    if (task) {
      console.log("Status:", status);
      task.status = StatusType[status];
      task.updatedAt = new Date().toLocaleString();
      const updatedJsonString = JSON.stringify(tasks, null, 2);
      await fs.writeFile(TASK_FILE, updatedJsonString, "utf-8");
      console.log(`Task Updated Successfully`);
    } else {
      console.log(`User with ID ${id} not found.`);
    }
  } catch (error) {
    console.error(
      "An error occurred during JSON file update Status:",
      error.message
    );
  }
}

async function getFileTasks(status = "all") {
  try {
    const tasks = await fs.readFile(TASK_FILE, "utf8");
    if (tasks.length === 0) {
      console.log("No Task Available, Please add your task first");
      return [];
    }
    let taskData = JSON.parse(tasks);
    if (status === "all") {
      return taskData;
    }
    taskData = taskData.filter((task) => task.status === StatusType[status]);
    return taskData;
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
}

async function printFileData(statusFilter = "all") {
  let data = await getFileTasks(statusFilter);
  if (data.length) {
    for (let task of data) {
      console.log(
        `id: ${task.id}\ndescription: ${task.description}\nStatus: ${task.status}`
      );
      console.log("--------------------");
    }
  } else {
    console.log("No Task Available");
  }
}

async function deleteTask(id) {
  try {
    let taskData = await getFileTasks();
    taskData = taskData.filter((task) => task.id != id);
    let updatedJsonString = JSON.stringify(taskData, null, 2);
    await fs.writeFile(TASK_FILE, updatedJsonString, "utf-8");
    console.log(`Task with id: ${id} deleted Successfully`);
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
}

start();
