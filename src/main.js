import SiteMenuComponent, {MenuItem} from './components/site-menu';
import FilterController from './controllers/filter';
import BoardComponent from './components/board';
import StatisticsComponent from './components/statistics';
import TasksModel from './models/tasks';
import BoardController from './controllers/board';
import { generateTasks } from './mock/task';
import {render} from './utils/render';

const TASK_COUNT = 22;

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
render(siteHeaderElement, siteMenuComponent);
const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});


//                                      /~\
//                                     |oo )
//                                     _\=/_
//                     ___         #  /  _  \
//                    / ()\        \\//|/.\|\\
//                  _|_____|_       \/  \_/  ||
//                 | | === | |         |\ /| ||
//                 |_|  O  |_|         \_ _/ #
//                  ||  O  ||          | | |
//                  ||__*__||          | | |
//                 |~ \___/ ~|         []|[]
//                 /=\ /=\ /=\         | | |
// ________________[_]_[_]_[_]________/_]_[_\_________________________
