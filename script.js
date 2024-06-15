function calculateDuration() {
  const tasksInput = document.getElementById('tasks').value.trim();
  let tasksData;

  try {
    tasksData = JSON.parse(tasksInput);
  } catch (error) {
    alert('Invalid JSON format for tasks data!');
    return;
  }

  const totalDuration = calculateWorkDuration(tasksData);
  displayResults(tasksData, totalDuration);
  drawGanttChart(tasksData);
}

function calculateWorkDuration(tasks) {
  let totalDuration = 0;

  tasks.forEach(task => {
    totalDuration += task.reserve;
  });

  return totalDuration;
}

function displayResults(tasks, totalDuration) {
  const tasksList = document.getElementById('tasks-list');
  const ganttChart = document.getElementById('gantt-chart');
  const totalDurationElement = document.getElementById('total-duration');

  totalDurationElement.textContent = `Total work duration: ${totalDuration} hours`;

  tasksList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.name}: ${task.reserve} hours`;
    tasksList.appendChild(li);
  });

  let timeline = "";
  let currentTime = 0;
  tasks.forEach(task => {
    timeline += `${task.name}: ${currentTime} - ${currentTime + task.reserve} hours\n`;
    currentTime += task.reserve;
  });
  ganttChart.textContent = timeline;
}

function drawGanttChart(tasks) {
  // Optional: Implement graphical Gantt chart using libraries like Chart.js
}
