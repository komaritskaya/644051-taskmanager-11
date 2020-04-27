import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import BoardController from "./controllers/board.js";
import { generateFilters } from "./mock/filter";
import { generateTasks } from "./mock/task";
import {render} from "./utils/render.js";

const TASK_COUNT = 22;

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent);
boardController.render(tasks);

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
