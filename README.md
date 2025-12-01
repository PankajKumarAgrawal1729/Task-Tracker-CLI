# [Task-Tracker-CLI](https://roadmap.sh/projects/task-tracker)


# Adding a new task
```console
add "Buy groceries"
```
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
```console
update 1 "Buy groceries and cook dinner"
```
```console
delete 1
```

# Marking a task as in progress or done
```console
mark-in-progress 1
```
```console
mark-done 1
```

# Listing all tasks
```console
list
```

# Listing tasks by status
```console
list done
```
```console
list todo
```
```console
list in-progress
```
