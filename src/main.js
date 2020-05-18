import API from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import SiteMenuComponent, {MenuItem} from './components/site-menu';
import FilterController from './controllers/filter';
import BoardComponent from './components/board';
import StatisticsComponent from './components/statistics';
import TasksModel from './models/tasks';
import BoardController from './controllers/board';
import {render} from './utils/render';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent);
filterController.render();
render(siteMainElement, boardComponent);
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

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    }).catch(() => {
  });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
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
