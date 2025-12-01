# Task-Tracker-CLI


# Adding a new task
```console
task-cli add "Buy groceries"
```
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
```console
task-cli update 1 "Buy groceries and cook dinner"
```
```console
task-cli delete 1
```

# Marking a task as in progress or done
```console
task-cli mark-in-progress 1
```
```console
task-cli mark-done 1
```

# Listing all tasks
```console
task-cli list
```

# Listing tasks by status
```console
task-cli list done
```
```console
task-cli list todo
```
```console
task-cli list in-progress
```
